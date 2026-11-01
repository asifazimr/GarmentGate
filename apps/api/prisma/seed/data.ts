/**
 * Demo data. All companies and people are fictional; emails use the reserved .example TLD.
 * Prices are minor units (cents).
 */

export const DEMO_PASSWORD = 'Password123!';

export const CATEGORIES = [
  {
    slug: 'tops',
    name: 'Tops',
    children: [
      { slug: 't-shirts', name: 'T-shirts' },
      { slug: 'polo-shirts', name: 'Polo shirts' },
      { slug: 'hoodies-sweatshirts', name: 'Hoodies & sweatshirts' },
      { slug: 'woven-shirts', name: 'Woven shirts' },
    ],
  },
  {
    slug: 'bottoms',
    name: 'Bottoms',
    children: [
      { slug: 'denim', name: 'Denim' },
      { slug: 'chinos-trousers', name: 'Chinos & trousers' },
      { slug: 'joggers', name: 'Joggers' },
    ],
  },
  {
    slug: 'activewear',
    name: 'Activewear',
    children: [
      { slug: 'leggings', name: 'Leggings' },
      { slug: 'sports-tops', name: 'Sports tops & bras' },
    ],
  },
  {
    slug: 'outerwear',
    name: 'Outerwear',
    children: [
      { slug: 'jackets', name: 'Jackets' },
      { slug: 'parkas-puffers', name: 'Parkas & puffers' },
    ],
  },
  {
    slug: 'knitwear',
    name: 'Knitwear',
    children: [{ slug: 'sweaters', name: 'Sweaters & cardigans' }],
  },
  { slug: 'kidswear', name: 'Kidswear', children: [] },
  { slug: 'workwear', name: 'Workwear', children: [] },
] as const;

export type CategorySlug =
  (typeof CATEGORIES)[number]['slug'] | (typeof CATEGORIES)[number]['children'][number]['slug'];

type Kyc = 'VERIFIED' | 'PENDING_REVIEW';

export interface SeedManufacturer {
  key: string;
  publicCode: string;
  kyc: Kyc;
  company: {
    legalName: string;
    tradeName: string;
    country: string;
    city: string;
    addressLine1: string;
    registrationNumber: string;
    website: string;
    yearEstablished: number;
  };
  owner: { firstName: string; lastName: string; email: string };
  profile: {
    headline: string;
    about: string;
    categories: CategorySlug[];
    monthlyCapacityPcs: number;
    moqPcs: number;
    sampleLeadTimeDays: number;
    productionLeadTimeMinDays: number;
    productionLeadTimeMaxDays: number;
    workforceSize: number;
    factorySizeSqm: number;
    machinery: { type: string; count: number }[];
    exportMarkets: string[];
    performanceScore: number;
    onTimeDeliveryBps: number;
  };
  certifications: { type: string; number: string; issued: string; expires: string }[];
  products: {
    title: string;
    category: CategorySlug;
    fabric: string;
    composition: string;
    gsm: number | null;
    moqPcs: number;
    leadTimeDays: number;
    /** [minQty, manufacturerUnitPrice, buyerUnitPrice] in cents */
    tiers: [number, number, number][];
  }[];
}

export const MANUFACTURERS: SeedManufacturer[] = [
  {
    key: 'dhakaKnit',
    publicCode: 'MFR-BD-0421',
    kyc: 'VERIFIED',
    company: {
      legalName: 'Meghna Knit Composite Ltd.',
      tradeName: 'Meghna Knit',
      country: 'BD',
      city: 'Gazipur',
      addressLine1: 'Plot 14, Konabari Industrial Area',
      registrationNumber: 'C-118204/2009',
      website: 'https://meghnaknit.example',
      yearEstablished: 2009,
    },
    owner: { firstName: 'Rafiq', lastName: 'Hossain', email: 'rafiq.hossain@meghnaknit.example' },
    profile: {
      headline: 'Vertical knit composite for basics and heavyweight streetwear',
      about:
        'Vertically integrated knit composite: knitting, dyeing, printing and sewing under one roof. ' +
        'Specialised in heavyweight jersey and fleece for streetwear and premium basics.',
      categories: ['t-shirts', 'polo-shirts', 'hoodies-sweatshirts', 'joggers'],
      monthlyCapacityPcs: 450_000,
      moqPcs: 1000,
      sampleLeadTimeDays: 10,
      productionLeadTimeMinDays: 45,
      productionLeadTimeMaxDays: 60,
      workforceSize: 3200,
      factorySizeSqm: 42_000,
      machinery: [
        { type: 'Single needle lockstitch', count: 820 },
        { type: 'Overlock', count: 610 },
        { type: 'Flatlock', count: 240 },
        { type: 'Circular knitting', count: 64 },
        { type: 'Automatic screen printing carousel', count: 6 },
      ],
      exportMarkets: ['US', 'DE', 'GB', 'NL', 'CA'],
      performanceScore: 92,
      onTimeDeliveryBps: 9450,
    },
    certifications: [
      {
        type: 'BSCI_AMFORI',
        number: 'AMF-DBID-412233',
        issued: '2025-03-10',
        expires: '2027-03-09',
      },
      { type: 'OEKO_TEX_100', number: '21.HBD.40211', issued: '2026-01-15', expires: '2027-01-14' },
      { type: 'WRAP', number: 'WRAP-BD-88412', issued: '2025-09-01', expires: '2026-12-31' },
      { type: 'GOTS', number: 'CU-1081402-GOTS', issued: '2026-02-01', expires: '2027-01-31' },
    ],
    products: [
      {
        title: 'Heavyweight boxy tee',
        category: 't-shirts',
        fabric: 'Single jersey',
        composition: '100% combed cotton',
        gsm: 240,
        moqPcs: 1000,
        leadTimeDays: 45,
        tiers: [
          [1000, 310, 365],
          [5000, 290, 335],
          [10000, 270, 312],
        ],
      },
      {
        title: 'Brushed fleece pullover hoodie',
        category: 'hoodies-sweatshirts',
        fabric: '3-thread brushed fleece',
        composition: '80% cotton, 20% polyester',
        gsm: 340,
        moqPcs: 800,
        leadTimeDays: 55,
        tiers: [
          [800, 920, 1060],
          [3000, 860, 990],
          [8000, 810, 930],
        ],
      },
      {
        title: 'Piqué polo shirt',
        category: 'polo-shirts',
        fabric: 'Piqué',
        composition: '100% cotton',
        gsm: 200,
        moqPcs: 1000,
        leadTimeDays: 50,
        tiers: [
          [1000, 420, 485],
          [5000, 395, 455],
        ],
      },
    ],
  },
  {
    key: 'chattogramDenim',
    publicCode: 'MFR-BD-0587',
    kyc: 'VERIFIED',
    company: {
      legalName: 'Karnaphuli Denim Mills Ltd.',
      tradeName: 'Karnaphuli Denim',
      country: 'BD',
      city: 'Chattogram',
      addressLine1: 'Road 3, Kalurghat Heavy Industrial Area',
      registrationNumber: 'CTG-55102/2004',
      website: 'https://karnaphulidenim.example',
      yearEstablished: 2004,
    },
    owner: { firstName: 'Nusrat', lastName: 'Chowdhury', email: 'nusrat@karnaphulidenim.example' },
    profile: {
      headline: 'Denim jeans and jackets with in-house laundry',
      about:
        'Denim manufacturer with an in-house laundry using ozone and laser finishing to cut water use. ' +
        'Five-pocket jeans, denim jackets and workwear trousers.',
      categories: ['denim', 'chinos-trousers', 'jackets', 'workwear'],
      monthlyCapacityPcs: 180_000,
      moqPcs: 1500,
      sampleLeadTimeDays: 14,
      productionLeadTimeMinDays: 60,
      productionLeadTimeMaxDays: 75,
      workforceSize: 2100,
      factorySizeSqm: 31_000,
      machinery: [
        { type: 'Single needle lockstitch', count: 540 },
        { type: 'Feed-off-the-arm', count: 90 },
        { type: 'Bartack', count: 70 },
        { type: 'Laser finishing', count: 4 },
        { type: 'Ozone washer', count: 3 },
      ],
      exportMarkets: ['US', 'DE', 'ES', 'GB', 'JP'],
      performanceScore: 88,
      onTimeDeliveryBps: 9120,
    },
    certifications: [
      { type: 'WRAP', number: 'WRAP-BD-71933', issued: '2025-06-01', expires: '2026-12-31' },
      { type: 'ISO_14001', number: 'EMS-BD-2210-77', issued: '2024-11-20', expires: '2027-11-19' },
      {
        type: 'HIGG_FEM',
        number: 'HIGG-FEM-2025-55102',
        issued: '2026-04-30',
        expires: '2027-04-29',
      },
    ],
    products: [
      {
        title: 'Five-pocket slim jeans, 12 oz',
        category: 'denim',
        fabric: 'Stretch denim 12 oz',
        composition: '98% cotton, 2% elastane',
        gsm: null,
        moqPcs: 1500,
        leadTimeDays: 65,
        tiers: [
          [1500, 780, 900],
          [5000, 735, 845],
        ],
      },
      {
        title: 'Classic trucker denim jacket',
        category: 'jackets',
        fabric: 'Rigid denim 13.5 oz',
        composition: '100% cotton',
        gsm: null,
        moqPcs: 1000,
        leadTimeDays: 70,
        tiers: [
          [1000, 1240, 1425],
          [4000, 1170, 1345],
        ],
      },
      {
        title: 'Carpenter work trousers',
        category: 'workwear',
        fabric: 'Cotton canvas 10 oz',
        composition: '100% cotton',
        gsm: null,
        moqPcs: 1500,
        leadTimeDays: 60,
        tiers: [[1500, 890, 1025]],
      },
    ],
  },
  {
    key: 'saigonActive',
    publicCode: 'MFR-VN-0133',
    kyc: 'VERIFIED',
    company: {
      legalName: 'Song Hong Activewear Co., Ltd.',
      tradeName: 'Song Hong Active',
      country: 'VN',
      city: 'Binh Duong',
      addressLine1: 'Lot C7, VSIP II Industrial Park',
      registrationNumber: '3702219844',
      website: 'https://songhongactive.example',
      yearEstablished: 2013,
    },
    owner: { firstName: 'Linh', lastName: 'Tran', email: 'linh.tran@songhongactive.example' },
    profile: {
      headline: 'Performance activewear with bonded and seamless construction',
      about:
        'Performance leggings, sports bras and training tops. Bonding, laser cutting and flatlock ' +
        'construction with recycled-polyester programmes for European brands.',
      categories: ['leggings', 'sports-tops', 'joggers'],
      monthlyCapacityPcs: 120_000,
      moqPcs: 800,
      sampleLeadTimeDays: 12,
      productionLeadTimeMinDays: 50,
      productionLeadTimeMaxDays: 65,
      workforceSize: 1250,
      factorySizeSqm: 18_500,
      machinery: [
        { type: 'Flatlock (4-needle 6-thread)', count: 260 },
        { type: 'Overlock', count: 210 },
        { type: 'Ultrasonic bonding', count: 18 },
        { type: 'Laser cutting', count: 6 },
      ],
      exportMarkets: ['DE', 'FR', 'GB', 'AU', 'US'],
      performanceScore: 90,
      onTimeDeliveryBps: 9310,
    },
    certifications: [
      {
        type: 'BSCI_AMFORI',
        number: 'AMF-DBID-388104',
        issued: '2025-05-20',
        expires: '2027-05-19',
      },
      { type: 'OEKO_TEX_100', number: '22.VN.11873', issued: '2026-03-01', expires: '2027-02-28' },
      { type: 'GRS', number: 'CU-1102937-GRS', issued: '2026-01-10', expires: '2027-01-09' },
    ],
    products: [
      {
        title: 'High-rise sculpt leggings',
        category: 'leggings',
        fabric: 'Interlock 4-way stretch',
        composition: '78% recycled polyester, 22% elastane',
        gsm: 260,
        moqPcs: 800,
        leadTimeDays: 55,
        tiers: [
          [800, 690, 815],
          [3000, 640, 755],
        ],
      },
      {
        title: 'Medium-support sports bra',
        category: 'sports-tops',
        fabric: 'Bonded interlock',
        composition: '75% nylon, 25% elastane',
        gsm: 230,
        moqPcs: 800,
        leadTimeDays: 55,
        tiers: [
          [800, 610, 720],
          [3000, 570, 672],
        ],
      },
      {
        title: 'Seamless training tee',
        category: 'sports-tops',
        fabric: 'Seamless knit',
        composition: '92% recycled polyester, 8% elastane',
        gsm: 160,
        moqPcs: 1000,
        leadTimeDays: 50,
        tiers: [[1000, 480, 566]],
      },
    ],
  },
  {
    key: 'tiruppurOrganic',
    publicCode: 'MFR-IN-0264',
    kyc: 'VERIFIED',
    company: {
      legalName: 'Noyyal Organic Apparels Pvt. Ltd.',
      tradeName: 'Noyyal Organic',
      country: 'IN',
      city: 'Tiruppur',
      addressLine1: '22 Avinashi Road, Anupparpalayam',
      registrationNumber: 'U18101TZ2011PTC017742',
      website: 'https://noyyalorganic.example',
      yearEstablished: 2011,
    },
    owner: { firstName: 'Priya', lastName: 'Raman', email: 'priya@noyyalorganic.example' },
    profile: {
      headline: 'GOTS-certified organic cotton basics and kidswear',
      about:
        'Organic and Fair Trade cotton programmes from yarn to garment. Tees, sweatshirts, babywear ' +
        'and kidswear with low MOQs for growing brands.',
      categories: ['t-shirts', 'hoodies-sweatshirts', 'kidswear'],
      monthlyCapacityPcs: 200_000,
      moqPcs: 500,
      sampleLeadTimeDays: 8,
      productionLeadTimeMinDays: 40,
      productionLeadTimeMaxDays: 55,
      workforceSize: 1400,
      factorySizeSqm: 16_000,
      machinery: [
        { type: 'Single needle lockstitch', count: 300 },
        { type: 'Overlock', count: 260 },
        { type: 'Flatlock', count: 120 },
        { type: 'Compactor', count: 2 },
      ],
      exportMarkets: ['DE', 'SE', 'DK', 'GB', 'FR'],
      performanceScore: 86,
      onTimeDeliveryBps: 8980,
    },
    certifications: [
      { type: 'GOTS', number: 'CU-1066231-GOTS', issued: '2026-02-15', expires: '2027-02-14' },
      { type: 'OEKO_TEX_100', number: '19.IN.55320', issued: '2025-12-01', expires: '2026-11-30' },
      { type: 'FAIR_TRADE', number: 'FLO-ID-38211', issued: '2025-07-01', expires: '2028-06-30' },
      { type: 'SA8000', number: 'SA8-IN-22914', issued: '2024-10-10', expires: '2027-10-09' },
    ],
    products: [
      {
        title: 'Organic cotton crew tee',
        category: 't-shirts',
        fabric: 'Single jersey',
        composition: '100% organic cotton (GOTS)',
        gsm: 180,
        moqPcs: 500,
        leadTimeDays: 40,
        tiers: [
          [500, 295, 345],
          [3000, 268, 312],
          [10000, 249, 290],
        ],
      },
      {
        title: 'Organic loopback sweatshirt',
        category: 'hoodies-sweatshirts',
        fabric: 'French terry',
        composition: '100% organic cotton (GOTS)',
        gsm: 320,
        moqPcs: 500,
        leadTimeDays: 50,
        tiers: [
          [500, 860, 995],
          [3000, 805, 930],
        ],
      },
      {
        title: 'Organic baby bodysuit (3-pack)',
        category: 'kidswear',
        fabric: 'Interlock rib',
        composition: '100% organic cotton (GOTS)',
        gsm: 190,
        moqPcs: 600,
        leadTimeDays: 45,
        tiers: [[600, 540, 625]],
      },
    ],
  },
  {
    key: 'anatoliaOuterwear',
    publicCode: 'MFR-TR-0078',
    kyc: 'PENDING_REVIEW',
    company: {
      legalName: 'Bosphorus Dış Giyim Tekstil San. ve Tic. A.Ş.',
      tradeName: 'Bosphorus Outerwear',
      country: 'TR',
      city: 'Istanbul',
      addressLine1: 'Ikitelli OSB, Demirciler Sitesi 7. Cad. No: 12',
      registrationNumber: 'IST-845221',
      website: 'https://bosphorusouterwear.example',
      yearEstablished: 1998,
    },
    owner: { firstName: 'Emre', lastName: 'Yılmaz', email: 'emre@bosphorusouterwear.example' },
    profile: {
      headline: 'Quick-turn outerwear and knitwear close to Europe',
      about:
        'Tailored and technical outerwear plus fine-gauge knitwear with 3–4 week lead times to ' +
        'European markets by road.',
      categories: ['jackets', 'parkas-puffers', 'sweaters'],
      monthlyCapacityPcs: 60_000,
      moqPcs: 300,
      sampleLeadTimeDays: 7,
      productionLeadTimeMinDays: 25,
      productionLeadTimeMaxDays: 35,
      workforceSize: 520,
      factorySizeSqm: 9_000,
      machinery: [
        { type: 'Single needle lockstitch', count: 180 },
        { type: 'Seam-sealing', count: 12 },
        { type: 'Down-filling', count: 4 },
        { type: 'Flat knitting (12–14 gauge)', count: 36 },
      ],
      exportMarkets: ['DE', 'NL', 'FR', 'GB'],
      performanceScore: 0,
      onTimeDeliveryBps: 0,
    },
    certifications: [
      {
        type: 'BSCI_AMFORI',
        number: 'AMF-DBID-301877',
        issued: '2025-10-01',
        expires: '2027-09-30',
      },
      { type: 'ISO_9001', number: 'QMS-TR-11928', issued: '2024-06-15', expires: '2027-06-14' },
      { type: 'SEDEX_SMETA', number: 'ZC-1201933', issued: '2026-05-05', expires: '2027-05-04' },
    ],
    products: [
      {
        title: 'Recycled-down puffer jacket',
        category: 'parkas-puffers',
        fabric: '20D ripstop, 90/10 recycled down',
        composition: '100% recycled nylon shell',
        gsm: null,
        moqPcs: 300,
        leadTimeDays: 35,
        tiers: [[300, 3450, 3970]],
      },
      {
        title: 'Merino crew-neck sweater, 14gg',
        category: 'sweaters',
        fabric: 'Fine-gauge knit',
        composition: '100% extra-fine merino wool',
        gsm: null,
        moqPcs: 300,
        leadTimeDays: 30,
        tiers: [[300, 2280, 2620]],
      },
    ],
  },
];

export interface SeedBuyer {
  key: string;
  publicCode: string;
  kyc: Kyc;
  company: {
    legalName: string;
    country: string;
    city: string;
    addressLine1: string;
    registrationNumber: string;
    website: string;
  };
  owner: { firstName: string; lastName: string; email: string };
  profile: {
    businessType: 'BRAND' | 'RETAILER' | 'IMPORTER';
    categories: CategorySlug[];
    annualVolumePcs: number;
    typicalOrderQuantityPcs: number;
    targetMarkets: string[];
    sourcingNeeds: string;
  };
}

export const BUYERS: SeedBuyer[] = [
  {
    key: 'northbound',
    publicCode: 'BYR-US-0012',
    kyc: 'VERIFIED',
    company: {
      legalName: 'Northbound Supply Co. LLC',
      country: 'US',
      city: 'Los Angeles',
      addressLine1: '1820 E 7th St',
      registrationNumber: 'CA-202119810042',
      website: 'https://northboundsupply.example',
    },
    owner: { firstName: 'Jordan', lastName: 'Reyes', email: 'jordan@northboundsupply.example' },
    profile: {
      businessType: 'BRAND',
      categories: ['t-shirts', 'hoodies-sweatshirts', 'joggers'],
      annualVolumePcs: 120_000,
      typicalOrderQuantityPcs: 8_000,
      targetMarkets: ['US', 'CA'],
      sourcingNeeds:
        'Heavyweight streetwear blanks and cut-and-sew with screen print and garment dye.',
    },
  },
  {
    key: 'gruenfeld',
    publicCode: 'BYR-DE-0007',
    kyc: 'VERIFIED',
    company: {
      legalName: 'Grünfeld Basics GmbH',
      country: 'DE',
      city: 'Berlin',
      addressLine1: 'Oranienstraße 185',
      registrationNumber: 'HRB 219874 B',
      website: 'https://gruenfeld-basics.example',
    },
    owner: { firstName: 'Lena', lastName: 'Hoffmann', email: 'lena@gruenfeld-basics.example' },
    profile: {
      businessType: 'BRAND',
      categories: ['t-shirts', 'hoodies-sweatshirts', 'kidswear'],
      annualVolumePcs: 60_000,
      typicalOrderQuantityPcs: 5_000,
      targetMarkets: ['DE', 'AT', 'CH', 'NL'],
      sourcingNeeds:
        'GOTS-certified organic basics only. Need full traceability and low-impact dyes.',
    },
  },
  {
    key: 'thamesHart',
    publicCode: 'BYR-GB-0019',
    kyc: 'PENDING_REVIEW',
    company: {
      legalName: 'Thames & Hart Retail Ltd',
      country: 'GB',
      city: 'Manchester',
      addressLine1: '48 Deansgate',
      registrationNumber: '13388412',
      website: 'https://thamesandhart.example',
    },
    owner: { firstName: 'Oliver', lastName: 'Bennett', email: 'oliver@thamesandhart.example' },
    profile: {
      businessType: 'RETAILER',
      categories: ['outerwear', 'sweaters', 'denim'],
      annualVolumePcs: 250_000,
      typicalOrderQuantityPcs: 3_000,
      targetMarkets: ['GB', 'IE'],
      sourcingNeeds:
        'Private-label outerwear and knitwear for AW collections, 300–3,000 pcs per style.',
    },
  },
];

export const ADMIN = {
  firstName: 'Amina',
  lastName: 'Siddiqui',
  email: 'admin@garmentgate.example',
};
