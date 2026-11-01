import { describe, expect, it } from 'vitest';
import { type ContactFlag, filterContactDetails, REDACTED } from './contact-filter.js';

/** Asserts the text is flagged, masked, and none of the given fragments survive. */
function expectHidden(input: string, gone: (string | RegExp)[], flag?: ContactFlag) {
  const result = filterContactDetails(input);
  expect(result.flagged, `should flag: ${input}`).toBe(true);
  expect(result.filtered).toContain(REDACTED);
  for (const fragment of gone) {
    if (typeof fragment === 'string')
      expect(result.filtered.toLowerCase()).not.toContain(fragment.toLowerCase());
    else expect(result.filtered).not.toMatch(fragment);
  }
  if (flag) expect(result.reasons).toContain(flag);
  return result;
}

function expectUntouched(input: string) {
  expect(filterContactDetails(input), `should not flag: ${input}`).toEqual({
    filtered: input,
    flagged: false,
    reasons: [],
  });
}

describe('emails', () => {
  it.each([
    ['rahim.k@dhakaknit.com', 'EMAIL'],
    ['RAHIM.K@DHAKAKNIT.COM.BD', 'EMAIL'],
    ['sales+bd@factory-mail.co.uk', 'EMAIL'],
    ['rahim @ dhakaknit . com', 'OBFUSCATED_CONTACT'],
    ['rahim＠dhakaknit.com', 'EMAIL'], // fullwidth @
  ] as const)('%s', (input, flag) => {
    expectHidden(`Write to ${input} today`, ['rahim', 'dhakaknit', 'factory-mail'], flag);
  });

  it.each([
    'rahim at gmail dot com',
    'rahim AT gmail DOT com',
    'rahim (at) gmail (dot) com',
    'rahim[at]gmail[dot]com',
    'rahim{at}dhakaknit{dot}com',
    'rahim<at>dhakaknit<dot>com',
    'rahim at dhakaknit dot co dot uk',
    'rahim [at] dhakaknit [.] com',
    'rahim at gmail',
    'rahim @ yahoo',
    'my gmail is rahim_k2019',
    'gmail id: rahimknits',
    'email me at rahim_k2019',
    'r a h i m @ g m a i l . c o m',
    'rahim&#64;gmail.com',
  ])('obfuscated: %s', (input) => {
    expectHidden(
      `Please ${input} thanks`,
      ['rahim', /gmail/i, 'dhakaknit', 'r a h i m'],
      'OBFUSCATED_CONTACT',
    );
  });

  it('survives zero-width characters inside the address', () => {
    expectHidden('rahim​@​gmail.com', ['rahim', 'gmail']);
  });
});

describe('phone numbers', () => {
  it.each([
    '+880 1711-234567',
    '+8801711234567',
    '01711234567',
    '017 1123 4567',
    '0171-112-3456',
    '(020) 7946 0958',
    '+44 20 7946 0958',
    '+90 (212) 555 12 34',
    '0171.112.3456',
    '+86 138 0013 8000',
  ])('plain: %s', (input) => {
    expectHidden(`Call ${input} anytime`, [/\d{3,}/], 'PHONE');
  });

  it.each([
    ['spaced digits', '0 1 7 1 1 2 3 4 5 6 7'],
    ['dashed digits', '0-1-7-1-1-2-3-4-5-6-7'],
    ['dotted digits', '0.1.7.1.1.2.3.4.5.6.7'],
    ['words', 'zero one seven one one two three four five six seven'],
    ['capitalised words', 'Zero One Seven One One Two Three Four Five Six Seven'],
    ['words with commas', 'zero, one, seven, one, one, two, three, four, five, six, seven'],
    ['mixed digits and words', '017 one one 23 four five 67'],
    ['oh for zero', 'oh one seven one one two three four five six seven'],
    ['double and triple', 'zero one double seven triple two four five'],
    ['teens and tens', 'zero seventeen eleven twenty three forty five sixty seven'],
    ['letter O for zero', 'O1711234567'],
    ['letter l for one', '0l7ll234567'],
    ['Bengali digits', '০১৭১১২৩৪৫৬৭'],
    ['Devanagari digits', '०९८७६५४३२१०'],
    ['fullwidth digits', '０１７１１２３４５６７'],
    ['circled digits', '⓪①⑦①①②③④⑤⑥⑦'],
    ['keycap emoji', '0️⃣1️⃣7️⃣1️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣'],
    ['Bengali words', 'shunno ek saat ek ek dui tin char panch choy saat'],
    ['Hindi words', 'shunya nau aath saat chhe paanch char teen'],
  ])('%s: %s', (_name, input) => {
    const result = expectHidden(`My number is ${input} ok`, [/\d{3}/, /seven|saat|one one/i]);
    expect(result.filtered).toContain('My number is');
  });
});

describe('URLs and domains', () => {
  it.each([
    ['https://dhakaknit.com/catalog', 'URL'],
    ['http://192-168.example.net', 'URL'],
    ['hxxps://dhakaknit.com', 'URL'],
    ['www.dhakaknit.com', 'URL'],
    ['WWW . dhakaknit . com', 'URL'],
    ['dhakaknit.com.bd', 'URL'],
    ['shop.dhakaknit.io/products', 'URL'],
    ['wa.me/8801711234567', 'URL'],
    ['t.me/dhakaknit', 'URL'],
    ['bit.ly/3xYz', 'URL'],
    ['dhakaknit[.]com', 'OBFUSCATED_CONTACT'],
    ['dhakaknit(.)com', 'OBFUSCATED_CONTACT'],
    ['dhakaknit dot com', 'OBFUSCATED_CONTACT'],
    ['dhakaknit (dot) com', 'OBFUSCATED_CONTACT'],
    ['h t t p s : / / d h a k a k n i t . c o m', 'OBFUSCATED_CONTACT'],
  ] as const)('%s', (input, flag) => {
    expectHidden(`See ${input} for more`, [/dhakaknit|d h a k a|8801711|3xYz/i], flag);
  });
});

describe('messengers and handles', () => {
  it.each([
    'WhatsApp me',
    'whatsapp +880 1711 234567',
    'whats app',
    'whatsap',
    'watsapp',
    'wh@tsapp',
    "what's app",
    'w h a t s a p p',
    'WA: 01711234567',
    'wechat id: factory_bd88',
    'we chat factory_bd88',
    'weixin factorybd',
    '加我微信 factorybd',
    'telegram @dhakaknit',
    'tg: dhakaknit',
    'skype live:rahim.k',
    'skipe rahim_k',
    'instagram @dhaka.knit',
    'insta: dhaka.knit',
    'IG @dhaka.knit',
    'line id: dhakaknit',
    'viber 01711234567',
    'facebook.com/dhakaknit',
    'fb: dhakaknit',
    'linked in rahim-k',
    'qq 123456789',
    'signal number 01711234567',
  ])('%s', (input) => {
    expectHidden(`Let's talk on ${input} instead`, [
      /whats|watsap|wh@ts|wechat|we chat|weixin|微信|telegram|skype|skipe|instagram|insta|viber|facebook|linked|signal/i,
      /factory_?bd|dhaka\.?knit|rahim|1711|123456789/i,
    ]);
  });

  it('masks a bare @handle', () => {
    expectHidden('follow @dhaka_knit_official', ['dhaka_knit'], 'SOCIAL_HANDLE');
  });

  it('does not eat ordinary words after a messenger name', () => {
    const { filtered } = filterContactDetails('Can we use WhatsApp for faster updates?');
    expect(filtered).toBe(`Can we use ${REDACTED} for faster updates?`);
  });

  it('removes everything in a combined attempt and reports each kind', () => {
    const result = filterContactDetails(
      'WhatsApp +880 1711-234567 or mail rahim at gmail dot com, site dhakaknit.com',
    );
    expect(result.filtered).not.toMatch(/1711|rahim|gmail|dhakaknit|whatsapp/i);
    expect(result.reasons).toEqual(['PHONE', 'URL', 'SOCIAL_HANDLE', 'OBFUSCATED_CONTACT']);
  });
});

describe('ordinary sourcing text is left alone', () => {
  it.each([
    '6000 pcs at 340 GSM brushed fleece, FOB Chattogram',
    'Target price EUR 11.50 per piece, delivery by 2026-03-15',
    'Delivery by 15/03/2027, quotes due 01.12.2026',
    'Reference RFQ-2026-00042 and ORD-2026-00017, factory MFR-BD-0421, buyer BYR-US-0012',
    'Monthly capacity 450,000 pieces with 1,200 machines',
    'Annual volume 1,000,000 units',
    'Composition: 95% cotton, 5% elastane. Sizes XS-XXL.',
    'We work with brands at scale. Lead time 45-60 days.',
    'MOQ 1000 per colour, 3 colours, 6 sizes',
    'Price tiers: 500, 1000, 5000, 10000 pcs',
    'Tiers 500 1000 5000 10000 pcs',
    'Quantity range 5000-10000',
    'HS code 6109.10.00 for cotton tees',
    'EU sizes 38 40 42 44 46 48',
    'Pantone 19-4052 TCX and 18-1663 TCX',
    'Inspection on 12 Nov between 10:30-12:30',
    'Season 2026-2027 programme',
    'Prices $3.20 / $3.10 / $2.95 by tier',
    '1x1 rib, 3x3 rib, 2x2 rib cuffs',
    'Delivered at Hamburg. It must be DDP.',
    'Shipped from the port at Chattogram. Co-ordinate with the forwarder.',
    'One colour, two sizes and three styles',
    'Use the Line sheet and the signal colour for trims',
    'The outlook for next season is strong',
    'Sample at 500 pcs @ $3.20 each',
    'Open techpack_v3.pdf and size_chart.xlsx',
    'Order 12,500 pcs: 4,000 S, 4,500 M, 4,000 L',
  ])('%s', (input) => {
    expectUntouched(input);
  });
});

describe('result shape', () => {
  it('lists reasons in a stable order and collapses adjacent redactions', () => {
    const result = filterContactDetails('rahim@dhakaknit.com +880 1711-234567');
    expect(result.reasons).toEqual(['EMAIL', 'PHONE']);
    expect(result.filtered).toBe(REDACTED);
  });

  it('keeps unflagged text byte-for-byte (no normalisation)', () => {
    const text = 'Ｆｕｌｌｗｉｄｔｈ title, ﬁne';
    expect(filterContactDetails(text).filtered).toBe(text);
  });
});
