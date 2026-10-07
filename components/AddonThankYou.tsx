import Footer from '@/components/Footer';
import ThankYouTracker from '@/components/ThankYouTracker';
import GroupJoinPanel, { type JoinGroup } from '@/components/GroupJoinPanel';
import { brand, schedule, type AddonId } from '@/lib/config';

// Shared layout for the add-on thank-you pages (/thank-you-recordings,
// /thank-you-private-call, /thank-you-all-addons). Plain /thank-you stays
// its own page. Every page shows the workshop group + details; recordings
// adds its WhatsApp group, the private call adds a direct cal.com booking
// button, and each add-on gets a details card.

const WORKSHOP_GROUP: JoinGroup = {
  key: 'workshop',
  kind: 'whatsapp',
  title: 'FM4 Workshop Group',
  desc: 'Zoom link, reminders and live updates for Day 1 and Day 2.',
  cta: 'Join Workshop Group',
  href: brand.whatsappUrl,
  event: 'join_whatsapp',
};

const ADDON_GROUPS: Record<AddonId, JoinGroup> = {
  recordings: {
    key: 'recordings',
    kind: 'whatsapp',
    title: 'Workshop Recordings Group',
    desc: 'Your Day 1 + Day 2 recordings are shared here after Day 2 ends.',
    cta: 'Join Recordings Group',
    href: brand.whatsappRecordingsUrl,
    event: 'join_whatsapp_recordings',
  },
  demo_call: {
    key: 'demo_call',
    kind: 'booking',
    title: 'Book Your Private Call',
    desc: 'Pick a date and time that suits you for your one-on-one FM4 demo call with Sourobh.',
    cta: 'Book Your Private Call',
    href: brand.privateCallBookingUrl,
    event: 'book_private_call',
  },
};

const ADDON_DETAILS: Record<AddonId, { icon: string; title: string; bullets: string[]; extra?: string; delivery: string }> = {
  recordings: {
    icon: '🎥',
    title: 'Workshop Recordings, Day 1 + Day 2',
    bullets: [
      'Full recording of Day 1: finding the root cause of your pain',
      'Full recording of Day 2: rebuilding strength and flexibility',
      'Lifetime access, no expiry date',
      'Redo the exercises at your own pace, as many times as you need',
    ],
    delivery: 'Shared in the Workshop Recordings group after Day 2 ends.',
  },
  demo_call: {
    icon: '📞',
    title: 'Private FM4 Demo Call with Sourobh',
    bullets: [
      'A private one-on-one call, not a group session',
      'Do the FM4 exercises live with him',
      'Personal suggestions based on how your body responds',
      'Ask your questions directly, with no group and no waiting',
    ],
    extra: '🎾 Keep your two tennis balls ready for the call.',
    delivery: 'Book your slot anytime using the "Book Your Private Call" button above.',
  },
};

export default function AddonThankYou({ addonIds, subtitle }: { addonIds: AddonId[]; subtitle: string }) {
  const groups = [WORKSHOP_GROUP, ...addonIds.map(id => ADDON_GROUPS[id])];
  const hasRecordings = addonIds.includes('recordings');
  const hasCall = addonIds.includes('demo_call');

  const groupPhrase = hasRecordings ? 'both WhatsApp groups' : 'the WhatsApp group';
  const joinLine = `Join ${groupPhrase}${hasCall ? ' and book your private call' : ''} below.`;
  const sharedLine = `Your Zoom link and reminders${hasRecordings ? ', and your workshop recordings,' : ''} are shared only inside ${hasRecordings ? 'these groups' : 'this group'}.`;
  const stickyTitle = hasCall
    ? `Join ${hasRecordings ? 'both groups' : 'the group'} & book your call`
    : 'Join both WhatsApp groups';

  return (
    <>
      <section className="thanks">
        <div className="container">
          <div className="thanks__card thanks__card--addons">
            <div className="thanks__icon thanks__icon--ok" aria-hidden="true">✓</div>
            <span className="thanks__pill">Woohoo!</span>
            <h1>You&apos;re In! Your Order is Confirmed</h1>
            <p className="thanks__sub">{subtitle}</p>

            <div className="thanks__caution">
              <strong>⚠️ Important:</strong> {joinLine} {sharedLine}
            </div>

            {/* ── WhatsApp groups + call booking (cards + mobile sticky bar) ── */}
            <GroupJoinPanel groups={groups} stickyTitle={stickyTitle} />

            {/* ── Order details ── */}
            <h2 className="ty-section-title">Your Order</h2>

            <div className="ty-detail">
              <div className="ty-detail__head">🗓 {brand.productName}</div>
              <ul className="ty-detail__list ty-detail__list--plain">
                <li><strong>Day 1</strong> – {schedule.day1}</li>
                <li><strong>Day 2</strong> – {schedule.day2}</li>
                <li><strong>Language</strong> – Hindi &amp; English</li>
              </ul>
            </div>

            {addonIds.map(id => {
              const d = ADDON_DETAILS[id];
              return (
                <div key={id} className={`ty-detail ty-detail--addon ty-detail--${id}`}>
                  <div className="ty-detail__head">{d.icon} {d.title}</div>
                  <ul className="ty-detail__list">
                    {d.bullets.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  {d.extra && <p className="ty-detail__extra">{d.extra}</p>}
                  <p className="ty-detail__delivery">📌 {d.delivery}</p>
                </div>
              );
            })}

            <p className="thanks__note">
              {hasRecordings
                ? 'Your recordings are shared in the Workshop Recordings group after Day 2 ends. Please stay in both groups so you don’t miss anything.'
                : 'Please stay in the WhatsApp group so you don’t miss any workshop updates.'}
            </p>

            <p className="thanks__signoff">{schedule.thankYouSignoff} ✨</p>
          </div>
        </div>
      </section>

      <Footer />
      <ThankYouTracker />
    </>
  );
}
