'use client';

import type { ReactNode } from 'react';
import { brand } from '@/lib/config';
import { trackGa4EventOnce, type Ga4EventName } from '@/lib/ga4';

// External anchor to a FM4 WhatsApp group. Defaults to the workshop
// community; the add-on thank-you pages pass their own `href` and GA4
// `event` (also reused for the cal.com private-call booking link). Instances sharing an event (primary CTA + sticky bottom)
// fire it exactly once per browser, regardless of which is clicked first.
//
// target="_blank" opens the WhatsApp link in a new tab — the current
// /thank-you tab stays alive, so a synchronous gtag() call in onClick
// fires cleanly. No sendBeacon or unload race to worry about.
export default function WhatsAppLink({
  children,
  className,
  href = brand.whatsappUrl,
  event = 'join_whatsapp',
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  event?: Ga4EventName;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackGa4EventOnce(event)}
    >
      {children}
    </a>
  );
}
