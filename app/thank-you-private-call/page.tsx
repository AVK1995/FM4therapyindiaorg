import type { Metadata } from 'next';
import AddonThankYou from '@/components/AddonThankYou';

export const metadata: Metadata = {
  title: 'Thank You · FM4 Therapy',
};

export default function ThankYouPrivateCallPage() {
  return (
    <AddonThankYou
      addonIds={['demo_call']}
      subtitle="Your workshop seat and your private FM4 demo call with Sourobh are confirmed."
    />
  );
}
