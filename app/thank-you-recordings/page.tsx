import type { Metadata } from 'next';
import AddonThankYou from '@/components/AddonThankYou';

export const metadata: Metadata = {
  title: 'Thank You · FM4 Therapy',
};

export default function ThankYouRecordingsPage() {
  return (
    <AddonThankYou
      addonIds={['recordings']}
      subtitle="Your workshop seat and your Day 1 + Day 2 recordings are confirmed."
    />
  );
}
