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

/** What the other side sees instead of contact details. */
export const REDACTED = '[contact info hidden]';

export interface ContactFilterResult {
  filtered: string;
  flagged: boolean;
  reasons: ContactFlag[];
}

// ── Vocabulary ───────────────────────────────────────────────────────────────

const TLDS = [
  'com',
  'net',
  'org',
  'io',
  'co',
  'biz',
  'info',
  'me',
  'app',
  'shop',
  'store',
  'online',
  'site',
  'xyz',
  'ly',
  'link',
  'page',
  'dev',
  'tech',
  'ai',
  'gg',
  'to',
  'cc',
  'tv',
  'ws',
  'live',
  'life',
  'world',
  'email',
  'club',
  'pro',
  'asia',
  'cn',
  'hk',
  'tw',
  'jp',
  'kr',
  'sg',
  'my',
  'id',
  'th',
  'vn',
  'ph',
  'kh',
  'lk',
  'pk',
  'in',
  'bd',
  'np',
  'ae',
  'sa',
  'tr',
  'eg',
  'ma',
  'de',
  'uk',
  'us',
  'ca',
  'au',
  'nz',
  'fr',
  'it',
  'es',
  'pt',
  'nl',
  'be',
  'ch',
  'se',
  'dk',
  'fi',
  'pl',
  'cz',
  'ru',
  'ua',
  'eu',
  'ie',
  'gr',
  'ro',
  'hu',
  'mx',
  'br',
  'ar',
  'cl',
  'za',
  'ng',
  'ke',
].join('|');

const MAIL_PROVIDERS =
  'gmail|googlemail|yahoo|ymail|hotmail|icloud|proton\\s*mail|protonmail|gmx|yandex|aol|zoho|rediffmail|qq\\s*mail|outlook\\s*(?:\\.|dot)\\s*com';

/** Spoken digits: English, Bengali and Hindi transliterations. Value per word. */
const NUMBER_WORDS: Record<string, string> = {
  zero: '0',
  oh: '0',
  nil: '0',
  nought: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  ten: '10',
  eleven: '11',
  twelve: '12',
  thirteen: '13',
  fourteen: '14',
  fifteen: '15',
  sixteen: '16',
  seventeen: '17',
  eighteen: '18',
  nineteen: '19',
  twenty: '20',
  thirty: '30',
  forty: '40',
  fifty: '50',
  sixty: '60',
  seventy: '70',
  eighty: '80',
  ninety: '90',
  // Bengali
  shunno: '0',
  ek: '1',
  dui: '2',
  tin: '3',
  char: '4',
  panch: '5',
  pach: '5',
  choy: '6',
  chhoy: '6',
  saat: '7',
  sat: '7',
  aat: '8',
  noy: '9',
  // Hindi
  shunya: '0',
  teen: '3',
  paanch: '5',
  chhe: '6',
  aath: '8',
  nau: '9',
};
const REPEATERS: Record<string, number> = { double: 2, triple: 3 };
const WORD_ALTERNATION = [...Object.keys(NUMBER_WORDS), ...Object.keys(REPEATERS)]
  .sort((a, b) => b.length - a.length)
  .join('|');

/** Messenger names, with the misspellings and spacings people use to dodge filters. */
const MESSENGERS = [
  "w+h?[a@4]+t+['’]?s*\\s*-?\\s*[a@4]+p+", // whatsapp, watsapp, whats app, wh@tsapp
  'whts?\\s*app?',
  'we\\s*-?\\s*chat',
  'weixin',
  'tele\\s*-?\\s*gr[a@]m',
  'telegrm',
  'sk[yi]pe',
  'insta\\s*-?\\s*gr[a@]m',
  'insta',
  'viber',
  'kakao\\s*(?:talk)?',
  'facebook',
  'messenger',
  'linked\\s*-?\\s*in',
  'tik\\s*-?\\s*tok',
  'snap\\s*-?\\s*chat',
  'zalo',
  'discord',
].join('|');
/** Short or common words that only count when followed by an id, number or handle. */
const MESSENGERS_WITH_ID = 'wa|wx|vx|tg|ig|fb|qq|line|signal|imo|snap';
const CJK_MESSENGERS = '微信|威信|薇信|电报|飞机号';
const HANDLE_CHAR = String.raw`[\p{L}\p{N}._\-+:]`;
/** Words that follow a messenger name in normal prose and are never the handle. */
const NOT_HANDLES = [
  'for',
  'to',
  'and',
  'or',
  'with',
  'if',
  'but',
  'so',
  'as',
  'at',
  'on',
  'in',
  'of',
  'by',
  'from',
  'the',
  'a',
  'an',
  'is',
  'are',
  'was',
  'be',
  'me',
  'us',
  'you',
  'we',
  'it',
  'this',
  'that',
  'only',
  'more',
  'details',
  'info',
  'updates',
  'faster',
  'quicker',
  'than',
  'because',
  'since',
  'etc',
  'then',
  'when',
  'while',
  'before',
  'after',
  'about',
  'instead',
  'please',
  'pls',
  'thanks',
  'thank',
  'here',
  'there',
  'now',
  'later',
  'soon',
  'today',
  'tomorrow',
  'again',
  'daily',
  'mostly',
  'often',
  'usually',
  'sometimes',
  'normally',
  'too',
  'also',
  'group',
  'groups',
  'chat',
  'chats',
  'call',
  'calls',
  'video',
  'voice',
  'message',
  'messages',
  'business',
  'web',
  'desktop',
  'every',
  'all',
  'any',
  'not',
  'no',
  'yes',
  'ok',
  'okay',
].join('|');
const HANDLE = String.raw`${HANDLE_CHAR}{3,}`;
const STRONG_CONNECTOR = String.raw`\s*(?:id|account|handle|username|user|number|no\.?|#|:|：|=)\s*`;
const WEAK_CONNECTOR = String.raw`\s*(?:is|me|on|at|-)?\s*`;

// ── Helpers ──────────────────────────────────────────────────────────────────

interface Pass {
  pattern: RegExp;
  /** Return the flag to redact the match, or null to keep it. */
  check: (match: string, ...groups: string[]) => ContactFlag | null;
}

const DIGIT_ZEROS = [0x30, 0x660, 0x6f0, 0x966, 0x9e6, 0xa66, 0xe50, 0xff10];

/** ASCII value of any decimal digit (Bengali ৭ → 7, fullwidth ７ → 7, circled ⑦ → 7). */
function asciiDigit(char: string): string {
  const cp = char.codePointAt(0) ?? 0;
  for (const zero of DIGIT_ZEROS) {
    if (cp >= zero && cp <= zero + 9) return String(cp - zero);
  }
  if (cp >= 0x2460 && cp <= 0x2468) return String(cp - 0x2460 + 1); // ①–⑨
  if (cp === 0x24ea) return '0'; // ⓪
  return '0';
}

/** The digits a phone-like run spells out, plus whether it was disguised. */
function spelledDigits(run: string): { digits: string; disguised: boolean } {
  let digits = '';
  let disguised = false;
  let repeat = 1;
  const tokens = run.match(new RegExp(`${WORD_ALTERNATION}|\\p{Nd}|[①-⑨⓪]|[oOlI]`, 'giu')) ?? [];
  for (const token of tokens) {
    const lower = token.toLowerCase();
    const repeater = REPEATERS[lower];
    if (repeater !== undefined) {
      repeat = repeater;
      disguised = true;
      continue;
    }
    let value: string;
    if (NUMBER_WORDS[lower] !== undefined && token.length > 1) {
      value = NUMBER_WORDS[lower];
      disguised = true;
    } else if (/^[oO]$/.test(token)) {
      value = '0';
      disguised = true;
    } else if (/^[lI]$/.test(token)) {
      value = '1';
      disguised = true;
    } else {
      value = asciiDigit(token);
      if (!/[0-9]/.test(token)) disguised = true;
    }
    digits += value.repeat(repeat);
    repeat = 1;
  }
  return { digits, disguised };
}

const QUANTITY_AFTER =
  /^\s*(?:pcs|pc|pieces?|units?|gsm|sets?|pairs?|dozens?|doz|cm|mm|kg|g|m|yards?|yds|%|usd|eur|gbp|days?|weeks?|months?|colou?rs?|sizes?|styles?)\b/i;
const QUANTITY_BEFORE =
  /(?:moq|qty|quantity|quantities|tiers?|sizes?|sizing|eu|uk|us)\s*[:\-–]?\s*$/i;

/** Number runs that look like phones but aren't: dates, quantities, HS codes, ranges, sizes. */
function isHarmlessNumber(run: string, before: string, after: string): boolean {
  const plain = run.trim();
  if (QUANTITY_AFTER.test(after) || QUANTITY_BEFORE.test(before)) return true;
  if (plain.startsWith('+')) return false;
  if (/^\d{4}[-/.]\d{1,2}[-/.]\d{1,2}$/.test(plain)) return true; // 2027-03-15
  if (/^\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}$/.test(plain)) return true; // 15/03/2027
  if (/^\d{1,3}(?:[,.'’]\d{3})+(?:[.,]\d{1,2})?$/.test(plain)) return true; // 1,000,000
  if (/^\d{4}\.\d{2}(?:\.\d{2,4})?$/.test(plain)) return true; // HS code 6109.10.00
  if (/^\d{1,2}:\d{2}(?:\s*[-–]\s*\d{1,2}:\d{2})?$/.test(plain)) return true; // 10:30-12:30
  if (/^(?:19|20)\d{2}\s*[-–/]\s*(?:19|20)\d{2}$/.test(plain)) return true; // 2026-2027
  const range = /^(\d+)\s*[-–]\s*(\d+)$/.exec(plain);
  if (range && (range[1] ?? '').endsWith('00') && (range[2] ?? '').endsWith('00')) return true; // 500-10000
  if (/^\d{3,}(?:\s*,\s+\d{3,})+$/.test(plain)) return true; // "500, 1000, 5000"
  const groups = plain.split(/[\s,/-]+/);
  if (
    groups.length >= 4 &&
    groups.every((g) => /^\d{2}$/.test(g) && Number(g) >= 20 && Number(g) <= 60)
  ) {
    return true; // EU sizes 38 40 42 44
  }
  return false;
}

// Platform codes look like numbers but must survive: RFQ-2026-00042, MFR-BD-0421.
const PLATFORM_CODE = /\b(?:RFQ|ORD|MFR|BYR)-(?:\d{4}|[A-Z]{2})-\d{4,6}\b/g;

function placeholder(index: number): string {
  let n = index;
  let letters = '';
  do {
    letters = String.fromCharCode(0x61 + (n % 26)) + letters;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return `${letters}`;
}

// ── Passes, in order ─────────────────────────────────────────────────────────

const AT = String.raw`\s*(?:[([{<]\s*(?:at|@)\s*[)\]}>]|\bat\b|@|＠|﹫|&#0*64;|\(a\))\s*`;
// A plain "." only counts unspaced ("gmail.com"), or spaced before com/net/org: "at Hamburg. It" is prose.
const DOT = String.raw`(?:\s*[([{<]\s*(?:dot|\.)\s*[)\]}>]\s*|\s*\bdot\b\s*|\.|。|\s*\.\s*(?=(?:com|net|org)\b))`;
const DOT_STRICT = String.raw`(?:\.|\s*[([{<]\s*(?:dot|\.)\s*[)\]}>]\s*|\s+dot\s+)`;
const LABEL = String.raw`[\p{L}\p{N}][\p{L}\p{N}-]*`;
const LOCAL = String.raw`[\p{L}\p{N}._%+\-]+`;

/** Single characters spaced out to dodge filters: "f a c t o r y @ g m a i l . c o m". */
const spacedOut: Pass = {
  pattern: /(?<![^\s])(?:\S[\s._*|-]{1,3}){5,}\S(?![^\s])/gu,
  check: (match) => {
    const parts = match.split(/[\s._*|-]+/);
    if (parts.some((p) => Array.from(p).length !== 1)) return null;
    const collapsed = match.replace(/[\s_*|-]+/g, '');
    if (collapsed.includes('@') || new RegExp(`(?:${MAIL_PROVIDERS})`, 'i').test(collapsed))
      return 'OBFUSCATED_CONTACT';
    if (new RegExp(`^(?:https?|www)|\\.(?:${TLDS})$`, 'i').test(collapsed))
      return 'OBFUSCATED_CONTACT';
    if (new RegExp(`^(?:${MESSENGERS})$`, 'iu').test(collapsed)) return 'OBFUSCATED_CONTACT';
    const { digits } = spelledDigits(collapsed);
    if (digits.length >= 7 && digits.length >= collapsed.replace(/\./g, '').length - 2)
      return 'OBFUSCATED_CONTACT';
    return null;
  },
};

const PASSES: Pass[] = [
  spacedOut,
  // name@example.com, sales@factory.example (any domain when written plainly)
  {
    pattern: new RegExp(String.raw`${LOCAL}[@＠﹫]${LABEL}(?:\.${LABEL})+`, 'giu'),
    check: () => 'EMAIL',
  },
  // name@example.com (spaces around @ and dots tolerated)
  {
    pattern: new RegExp(
      String.raw`${LOCAL}\s*[@＠﹫]\s*${LABEL}(?:\s*\.\s*${LABEL})*\s*\.\s*(?:${TLDS})\b`,
      'giu',
    ),
    check: (m) => (/\s/.test(m) ? 'OBFUSCATED_CONTACT' : 'EMAIL'),
  },
  // name at gmail dot com, name(at)example(dot)com, name [at] example [.] co [.] uk
  {
    pattern: new RegExp(
      String.raw`${LOCAL}${AT}${LABEL}(?:${DOT}${LABEL})*${DOT}(?:${TLDS})\b`,
      'giu',
    ),
    check: () => 'OBFUSCATED_CONTACT',
  },
  // name at gmail, name @ yahoo (provider named, no TLD)
  {
    pattern: new RegExp(String.raw`${LOCAL}${AT}(?:${MAIL_PROVIDERS})\b`, 'giu'),
    check: () => 'OBFUSCATED_CONTACT',
  },
  // "my gmail is factory_bd2020", "gmail id: factorybd"
  {
    pattern: new RegExp(
      String.raw`\b(?:${MAIL_PROVIDERS})\b(?:\s*(?:id|address|account|is|:|-|=)\s*)+[\p{L}\p{N}._%+\-]{3,}`,
      'giu',
    ),
    check: () => 'OBFUSCATED_CONTACT',
  },
  // "email me at factory_bd2020", "mail to: rafiq.h"
  {
    pattern: /\be-?mail\s*(?:me|us|him|her)?\s*(?:at|on|to|:|-)\s*([\p{L}\p{N}._%+-]{3,})/giu,
    check: (_m, handle = '') => (/[\d_.]/.test(handle) ? 'OBFUSCATED_CONTACT' : null),
  },
  // https://…, hxxp://…, www.…
  {
    pattern: /\b(?:https?|hxxps?|ftp)\s*:\s*\/\/[^\s<>"']+|\bwww\s*\.\s*[^\s<>"']+/giu,
    check: () => 'URL',
  },
  // example.com, shop.example.bd/path, example[.]com, example (dot) com, wa.me/880…
  {
    pattern: new RegExp(
      String.raw`\b${LABEL}(?:${DOT_STRICT}${LABEL})*${DOT_STRICT}(?:${TLDS})\b(?:\/[^\s<>"']*)?`,
      'giu',
    ),
    check: (m) => {
      // A bare number before the dot is a price or decimal, not a domain ("3.20 in total").
      if (/^\d+\.(?:\w+)$/.test(m)) return null;
      return /dot|[([{<]/i.test(m) ? 'OBFUSCATED_CONTACT' : 'URL';
    },
  },
  // WhatsApp / WeChat / Telegram / Skype / Instagram … plus the handle that follows, if any:
  // after "id:", "account", "#" anything; otherwise only something handle-like (@x, digits, _)
  {
    pattern: new RegExp(
      String.raw`(?:\b(?:${MESSENGERS})\b|${CJK_MESSENGERS})(?:(?:${STRONG_CONNECTOR})+@?${HANDLE}|${WEAK_CONNECTOR}(?:@${HANDLE}|(?!(?:${NOT_HANDLES})\b)${HANDLE}))?`,
      'giu',
    ),
    check: () => 'SOCIAL_HANDLE',
  },
  // Short names only with an id: "WA: +880…", "IG @factory", "line id factorybd"
  {
    pattern: new RegExp(
      String.raw`\b(?:${MESSENGERS_WITH_ID})\b(?:\s*(?:id|account|handle|number|no\.?|#)\s*[:：-]?|\s*[:：@])\s*@?[\p{L}\p{N}._\-+]{3,}`,
      'giu',
    ),
    check: () => 'SOCIAL_HANDLE',
  },
  // @handle (emails are already gone; "@ $3.20" and "@3.20" are prices)
  {
    pattern: /(?<![\p{L}\p{N}._%+-])@[\p{L}\p{N}_.]{3,}/giu,
    check: (m) => (/[\p{L}_]/u.test(m) ? 'SOCIAL_HANDLE' : null),
  },
];

/**
 * Phone numbers however they're written: +880 1711-234567, 0 1 7 1 1 …, "zero one seven one…",
 * "double seven", O17ll234567, ০১৭১১২৩৪৫৬৭, mixed digits and words. A run of number-like tokens
 * with short separators that spells 7+ digits is redacted unless it's clearly a date, quantity,
 * HS code, range or size list.
 */
const NUMBER_TOKEN = String.raw`(?:\b(?:${WORD_ALTERNATION})\b|[\p{Nd}①-⑨⓪]+(?:️?⃣)?|(?<=[\p{Nd}])[oOlI]+(?![\p{L}])|(?<![\p{L}])[oOlI](?=[\p{Nd}]))`;
const SEPARATOR = String.raw`[\s\-–—.,()/\\_*#~|:️⃣]{0,4}`;
const PHONE_RUN = new RegExp(`\\+?\\(?${NUMBER_TOKEN}(?:${SEPARATOR}${NUMBER_TOKEN})*`, 'giu');

function redactPhones(text: string, reasons: Set<ContactFlag>): string {
  return text.replace(PHONE_RUN, (run: string, offset: number) => {
    const { digits, disguised } = spelledDigits(run);
    if (digits.length < 7) return run;
    const before = text.slice(Math.max(0, offset - 24), offset);
    const after = text.slice(offset + run.length, offset + run.length + 16);
    if (!disguised && isHarmlessNumber(run, before, after)) return run;
    reasons.add(disguised ? 'OBFUSCATED_CONTACT' : 'PHONE');
    return REDACTED;
  });
}

/**
 * Detects and redacts contact details in user-generated text: emails, phone numbers, URLs and
 * domains, messenger mentions and handles, and the usual obfuscations of each. Run it
 * server-side on every piece of free text before it is stored or delivered, and keep the
 * original in an admin-only field. The client may run it too, as a hint only.
 */
export function filterContactDetails(input: string): ContactFilterResult {
  const reasons = new Set<ContactFlag>();

  // Normalise lookalikes that hide contact details (fullwidth letters, zero-width spaces).
  const protectedCodes: string[] = [];
  let text = input
    .normalize('NFKC')
    .replace(/[\u200B-\u200D\u2060\uFEFF\u00AD]/g, '')
    .replace(PLATFORM_CODE, (code) => {
      protectedCodes.push(code);
      return placeholder(protectedCodes.length - 1);
    });

  for (const pass of PASSES) {
    text = text.replace(pass.pattern, (match: string, ...rest: unknown[]) => {
      if (match.includes(REDACTED)) return match;
      // Callback args are (...groups, offset, input).
      const groups = rest.slice(0, -2).map((g) => (typeof g === 'string' ? g : ''));
      const flag = pass.check(match, ...groups);
      if (!flag) return match;
      reasons.add(flag);
      return REDACTED;
    });
  }
  text = redactPhones(text, reasons);

  // Collapse "[contact info hidden] [contact info hidden]" runs left by adjacent matches.
  const escaped = REDACTED.replace(/[[\]]/g, '\\$&');
  text = text.replace(new RegExp(`${escaped}(?:[\\s,;:/+-]*${escaped})+`, 'g'), REDACTED);
  text = text.replace(/([a-z]+)/g, (_m, letters: string) => {
    let index = 0;
    for (const ch of letters) index = index * 26 + (ch.charCodeAt(0) - 0x61 + 1);
    return protectedCodes[index - 1] ?? '';
  });

  // Untouched text comes back exactly as typed (NFKC only matters when something matched).
  const flagged = reasons.size > 0;
  return {
    filtered: flagged ? text : input,
    flagged,
    reasons: ContactFlagSchema.options.filter((flag) => reasons.has(flag)),
  };
}
