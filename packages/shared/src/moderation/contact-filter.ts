import { z } from 'zod';

/** Mirrors the Prisma `ContactFlag` enum. */
export const ContactFlagSchema = z.enum([
  'EMAIL',
  'PHONE',
  'URL',
  'SOCIAL_HANDLE',
  'OBFUSCATED_CONTACT',
  'OTHER',
]);
export type ContactFlag = z.infer<typeof ContactFlagSchema>;

export const REDACTED = '[contact removed]';

export interface ContactFilterResult {
  filtered: string;
  flagged: boolean;
  reasons: ContactFlag[];
}

const TLDS =
  'com|net|org|io|co|biz|info|me|app|shop|store|online|site|xyz|bd|vn|in|pk|tr|cn|hk|de|uk|us|fr|it|es|nl|eu|ae|lk|kh|id|my|th';

const NUMBER_WORDS =
  'zero|oh|one|two|three|four|five|six|seven|eight|nine|ek|dui|tin|char|panch|chhoy|saat|aat|noy|shunno';

const MESSENGERS =
  'whats\\s*app|whtsapp|watsapp|wa\\.me|we\\s*chat|weixin|skype|telegram|viber|signal|imo|line\\s*id|kakao(?:\\s*talk)?|instagram|insta|facebook|messenger|linked\\s*in|tiktok|snapchat|zalo|qq';

interface Rule {
  flag: ContactFlag;
  pattern: RegExp;
  /** Extra check on the matched text; return false to keep it. */
  accept?: (match: string) => boolean;
}

const RULES: Rule[] = [
  // name@example.com
  { flag: 'EMAIL', pattern: /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/gi },
  // name [at] example [dot] com, name(at)example(dot)com, name at example dot com
  {
    flag: 'OBFUSCATED_CONTACT',
    pattern: new RegExp(
      `[\\w.+-]+\\s*[([{<]?\\s*(?:@|at)\\s*[)\\]}>]?\\s*[\\w-]+\\s*[([{<]?\\s*(?:\\.|dot)\\s*[)\\]}>]?\\s*(?:${TLDS})\\b`,
      'gi',
    ),
    accept: (m) => /\b(?:at|dot)\b|[([{<]/i.test(m),
  },
  // https://…, www.…
  { flag: 'URL', pattern: /\b(?:https?:\/\/|www\.)[^\s<>"']+/gi },
  // example.com, shop.example.bd/path
  {
    flag: 'URL',
    pattern: new RegExp(
      `\\b[a-z0-9][a-z0-9-]*(?:\\.[a-z0-9-]+)*\\.(?:${TLDS})\\b(?:\\/[^\\s<>"']*)?`,
      'gi',
    ),
  },
  // "WhatsApp: +880…", "wechat id factory_bd", "on Skype"
  {
    flag: 'SOCIAL_HANDLE',
    pattern: new RegExp(
      `\\b(?:${MESSENGERS})\\b(?:\\s*(?:id|number|no\\.?|handle|account)?\\s*[:\\-=]?\\s*@?[\\w.\\-+]{3,}(?=\\s|$|[,;!?]))?`,
      'gi',
    ),
  },
  // @handle (not part of an email, which is removed earlier)
  { flag: 'SOCIAL_HANDLE', pattern: /(?<![\w.])@[a-z0-9_.]{3,}/gi },
  // Phone numbers: +880 1711-234567, (020) 7946 0958, 01711234567
  {
    flag: 'PHONE',
    pattern: /(?<![\w-])\+?\(?\d[\d\s().-]{5,}\d(?![\w-])/g,
    accept: (m) => {
      const digits = m.replace(/\D/g, '');
      if (/^\d{4}-\d{2}-\d{2}$/.test(m.trim())) return false; // ISO date
      if (digits.length >= 10) return true;
      return digits.length >= 7 && (/^\s*\+/.test(m) || /[\s().-]/.test(m.trim()));
    },
  },
  // Spelled-out numbers: "zero one seven one one …" (7+ words/digits in a row)
  {
    flag: 'OBFUSCATED_CONTACT',
    pattern: new RegExp(`\\b(?:(?:${NUMBER_WORDS}|\\d)\\b[\\s,.-]*){7,}`, 'gi'),
    accept: (m) => new RegExp(`\\b(?:${NUMBER_WORDS})\\b`, 'i').test(m),
  },
];

/**
 * Detects and redacts contact details from user-generated text.
 * Run server-side on every piece of free text before it is stored or delivered;
 * keep the original in an admin-only field.
 */
export function filterContactDetails(input: string): ContactFilterResult {
  const reasons = new Set<ContactFlag>();
  let filtered = input;

  for (const rule of RULES) {
    filtered = filtered.replace(rule.pattern, (match) => {
      if (match.includes(REDACTED)) return match;
      if (rule.accept && !rule.accept(match)) return match;
      reasons.add(rule.flag);
      return REDACTED;
    });
  }

  // Collapse "[contact removed] [contact removed]" runs left by adjacent matches.
  const escaped = REDACTED.replace(/[[\]]/g, '\\$&');
  filtered = filtered.replace(new RegExp(`${escaped}(?:[\\s,;:/-]*${escaped})+`, 'g'), REDACTED);

  return {
    filtered,
    flagged: reasons.size > 0,
    reasons: ContactFlagSchema.options.filter((flag) => reasons.has(flag)),
  };
}
