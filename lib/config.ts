// =====================================================================
// FM4 Therapy — single source of truth for pricing & brand strings.
// PRICE_INR drives Razorpay (paise), Pabbly (string), CAPI (numeric)
// and every price displayed in the UI.
// =====================================================================

const SERVER_PRICE = parseInt(process.env.PRICE_INR || '97', 10);
const SERVER_ORIGINAL = parseInt(process.env.ORIGINAL_PRICE_INR || '499', 10);

// Client-side reads NEXT_PUBLIC_* (Next.js inlines these at build time)
const CLIENT_PRICE = parseInt(
  process.env.NEXT_PUBLIC_PRICE_INR || process.env.PRICE_INR || '97',
  10
);
const CLIENT_ORIGINAL = parseInt(
  process.env.NEXT_PUBLIC_ORIGINAL_PRICE_INR ||
    process.env.ORIGINAL_PRICE_INR ||
    '499',
  10
);

export const pricing = {
  // Server-only price math
  inr: SERVER_PRICE,
  originalInr: SERVER_ORIGINAL,
  paise: SERVER_PRICE * 100,
  amountString: String(SERVER_PRICE),
  savings: SERVER_ORIGINAL - SERVER_PRICE,
  currency: 'INR',

  // Master kill-switch for ALL ad-platform / automation events.
  // Set PRICE_INR=1 in the test environment (Vercel preview) → no Meta
  // Pixel script renders, no CAPI fires, no Pabbly webhook from real
  // payments. Set PRICE_INR=97 in production → everything fires.
  // Same gate mirrored on the client via NEXT_PUBLIC_PRICE_INR.
  trackingEnabled: SERVER_PRICE > 1,

  // Mirror values for the client bundle
  client: {
    inr: CLIENT_PRICE,
    originalInr: CLIENT_ORIGINAL,
    savings: CLIENT_ORIGINAL - CLIENT_PRICE,
    paise: CLIENT_PRICE * 100,
    currency: 'INR' as const,
    trackingEnabled: CLIENT_PRICE > 1,
  },
};

// ── Workshop schedule — every date/time string on the site reads from here.
// Override any of these via .env (NEXT_PUBLIC_WORKSHOP_*) without touching code.
export const schedule = {
  /** Used on the Date info card across /, /hi, /mar (e.g. "16th, 17th May"). */
  dateRange:
    process.env.NEXT_PUBLIC_WORKSHOP_DATE_RANGE || '16th, 17th May',
  /** Time info card — Day 1 line (e.g. "16th – 8:00 PM"). Also reused in checkout. */
  day1:
    process.env.NEXT_PUBLIC_WORKSHOP_DAY1 || '16th – 8:00 PM',
  /** Time info card — Day 2 line (e.g. "17th – 10:00 AM"). Also reused in checkout. */
  day2:
    process.env.NEXT_PUBLIC_WORKSHOP_DAY2 || '17th – 10:00 AM',
  /** Sentence form used in FAQ answers across all 3 languages (e.g. "16th and 17th May"). */
  faqDates:
    process.env.NEXT_PUBLIC_WORKSHOP_FAQ_DATES || '16th and 17th May',
  /** Sign-off line at the bottom of the Thank You page (e.g. "See you LIVE on 16th May at 8:00 PM"). */
  thankYouSignoff:
    process.env.NEXT_PUBLIC_WORKSHOP_SIGNOFF || 'See you LIVE on 16th May at 8:00 PM',
  /** Compact event line used by Razorpay modal + cross-funnel surfaces. */
  eventLine:
    process.env.NEXT_PUBLIC_WORKSHOP_EVENT_LINE ||
    '16th & 17th May · 8 PM / 10 AM IST',
  /** Shorter date span used in the Razorpay modal description. */
  modalDateSpan:
    process.env.NEXT_PUBLIC_WORKSHOP_MODAL_DATES || '16th–17th May',
};

// All brand / copy strings live here so editing one field updates the whole site.
export const brand = {
  name: 'FM4 Therapy',
  short: 'FM4',
  productName: 'Pain Free with FM4 Workshop',
  eventLine: schedule.eventLine,
  modalName: 'FM4 Therapy',
  modalDescription: `Pain Free with FM4 Workshop · ${schedule.modalDateSpan}`,
  themeColor: '#00984B',
  coach: {
    name: 'Sourobh Kulkorni',
    initial: 'S',
    subtitle: 'Your coach for this workshop',
  },
  guarantee: '100% Money Back Guarantee — Zero Risk',
  capiCurrency: 'INR',
  paymentTimezone: 'Asia/Kolkata',
  thankYouPath: '/thank-you',
  funnelSlug: 'fm4-workshop',
  utmSessionKey: 'fm4_utm',
  email: 'sourobhkulkorni@gmail.com',
  /** Support contact shown on the legal pages. E.164 format — used for the tel: link too. */
  phone: '+919667953335',
  ownerLegalName: 'Fitness Master FM4 Health solutions private limited',
  address:
    'Wing B, Flat 1704, 17th floor Ganga Ishanya Dhankawdi Pune 411043',
  trustBadges: ['🔒 Razorpay Secured', 'SSL Encrypted', '100% Money Back'],
  valueBullets: [
    '2-Day Live Workshop with Sourobh Kulkorni',
    'Personalized FM4 Therapy pain assessment',
    'Replay + WhatsApp community access · Hindi & English',
  ],
  // Public env-derived values
  whatsappUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://chat.whatsapp.com/',
  /** Group for recordings buyers — recordings + bonuses are posted after Day 2. */
  whatsappRecordingsUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_RECORDINGS_URL || 'https://chat.whatsapp.com/',
  /** Group for private-call buyers — the booking link is posted after Day 2. */
  whatsappPrivateCallUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_PRIVATE_CALL_URL || 'https://chat.whatsapp.com/',
};

// ── Checkout add-ons (order bumps). Prices are fixed in code so the server
// can recompute the order total from the ids alone — the client never sends
// an amount it could tamper with. `id` is what travels in Razorpay notes and
// lands in the Pabbly payload, so don't rename an id once it's live.
export type AddonId = 'recordings' | 'demo_call';

export interface Addon {
  id: AddonId;
  badge: string;
  title: string;
  /** Short label for the mobile sticky bar. */
  shortTitle: string;
  inr: number;
  hook: string;
  bullets: string[];
  tapLine: string;
}

export const addons: Addon[] = [
  {
    id: 'recordings',
    badge: 'RECOMMENDED',
    title: 'Workshop recordings, Day 1 + Day 2',
    shortTitle: 'Add workshop recordings',
    inr: 500,
    hook: 'Attend live, then keep both days for good. Rewatch and redo the exercises whenever you need.',
    bullets: [
      'Full recording of Day 1: finding the root cause of your pain',
      'Full recording of Day 2: rebuilding strength and flexibility',
      'Lifetime access, no expiry date',
      'Redo the exercises at your own pace, as many times as you need',
      `Your live seat is still included in the ₹${pricing.client.inr}`,
    ],
    tapLine: 'TAP TO ADD FOR ₹500 MORE',
  },
  {
    id: 'demo_call',
    badge: 'ONE-ON-ONE',
    title: 'Private FM4 demo call with Sourobh',
    shortTitle: 'Add 1-on-1 call with Sourobh',
    inr: 1500,
    hook: 'Sourobh sir takes your FM4 demo himself. You do the exercises with him, and he tells you what to do next.',
    bullets: [
      'A private one-on-one call with Sourobh, not a group session',
      'Do the FM4 exercises live with him',
      'He gives you suggestions based on how your body responds',
      'Ask your questions directly, with no group and no waiting',
      'Keep your two tennis balls ready',
      'Slot booked after registration',
    ],
    tapLine: 'TAP TO ADD FOR ₹1,500 MORE',
  },
];

/** Keeps only known ids, de-duplicated, in catalogue order. */
export function normalizeAddonIds(ids: unknown): AddonId[] {
  const wanted = new Set(Array.isArray(ids) ? ids : []);
  return addons.filter(a => wanted.has(a.id)).map(a => a.id);
}

export function addonsTotalInr(ids: AddonId[]): number {
  return addons.reduce((sum, a) => (ids.includes(a.id) ? sum + a.inr : sum), 0);
}

/** Thank-you page for each add-on combination (mirrors purchase_type). */
export function thankYouPathFor(ids: AddonId[]): string {
  const recordings = ids.includes('recordings');
  const call = ids.includes('demo_call');
  if (recordings && call) return '/thank-you-all-addons';
  if (recordings) return '/thank-you-recordings';
  if (call) return '/thank-you-private-call';
  return brand.thankYouPath;
}

// Submit button label, dynamically renders with current price
export function submitButtonLabel(): string {
  return `Place Your Order — ₹${pricing.client.inr}`;
}

// Save badge text
export function saveBadgeText(): string {
  return `SAVE ₹${pricing.client.savings}`;
}
