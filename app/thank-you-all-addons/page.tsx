import type { Metadata } from 'next';
import AddonThankYou from '@/components/AddonThankYou';

export const metadata: Metadata = {
  title: 'Thank You · FM4 Therapy',
};

export default function ThankYouAllAddonsPage() {
  return (
    <AddonThankYou
      addonIds={['recordings', 'demo_call']}
      subtitle="Your workshop seat, your Day 1 + Day 2 recordings and your private call with Sourobh are all confirmed."
    />
  );
}
