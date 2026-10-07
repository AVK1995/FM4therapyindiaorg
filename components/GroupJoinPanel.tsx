'use client';

import { useEffect, useRef, useState } from 'react';
import WhatsAppLink from '@/components/WhatsAppLink';
import type { Ga4EventName } from '@/lib/ga4';

export interface JoinGroup {
  key: string;
  /** 'whatsapp' = join a group (green); 'booking' = open the call booking page (gold). */
  kind: 'whatsapp' | 'booking';
  title: string;
  desc: string;
  cta: string;
  href: string;
  event: Ga4EventName;
}

// Numbered action cards (WhatsApp groups + call booking) + a mobile sticky
// bar with every action's button stacked one below the other. The bar
// hides while the cards are on screen so the same buttons never show twice.
export default function GroupJoinPanel({ groups, stickyTitle }: { groups: JoinGroup[]; stickyTitle: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [listVisible, setListVisible] = useState(true);

  useEffect(() => {
    const el = listRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setListVisible(entry.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const btnClass = (g: JoinGroup) => (g.kind === 'booking' ? 'btn btn--cta btn--block' : 'btn btn--whatsapp btn--block');
  const icon = (g: JoinGroup) => (g.kind === 'booking' ? '📅' : '💬');

  return (
    <>
      <ol className="ty-groups" ref={listRef}>
        {groups.map((g, i) => (
          <li key={g.key} className={`ty-group ty-group--${g.kind}`}>
            <div className="ty-group__head">
              <span className="ty-group__num" aria-hidden="true">{i + 1}</span>
              <strong className="ty-group__title">{g.title}</strong>
            </div>
            <p className="ty-group__desc">{g.desc}</p>
            <WhatsAppLink href={g.href} event={g.event} className={`${btnClass(g)} ty-group__btn`}>
              {icon(g)} {g.cta}
            </WhatsAppLink>
          </li>
        ))}
      </ol>

      <aside
        className={`ty-sticky ty-sticky--${groups.length}${listVisible ? '' : ' is-visible'}`}
        aria-label={stickyTitle}
        aria-hidden={listVisible}
      >
        <p className="ty-sticky__title">👇 {stickyTitle}</p>
        {groups.map((g, i) => (
          <WhatsAppLink
            key={g.key}
            href={g.href}
            event={g.event}
            className={`${btnClass(g)} ty-sticky__btn`}
          >
            <span className="ty-sticky__num" aria-hidden="true">{i + 1}</span>
            <span>{g.cta}</span>
          </WhatsAppLink>
        ))}
      </aside>
    </>
  );
}
