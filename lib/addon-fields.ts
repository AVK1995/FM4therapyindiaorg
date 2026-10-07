import { addons, addonsTotalInr, pricing, type AddonId } from '@/lib/config';

// Flat add-on columns appended to every Pabbly payload (paid webhook and the
// free-coupon path) so the Sheet gets one stable column per add-on.
// `purchase_type` is the single key Pabbly routers filter on — one exact
// value per combination:
//   workshop_only | workshop_recordings | workshop_demo_call | workshop_recordings_demo_call
export function buildAddonFields(ids: AddonId[]) {
  const picked = addons.filter(a => ids.includes(a.id));
  return {
    purchase_type:    ['workshop', ...ids].join('_') + (ids.length ? '' : '_only'),
    base_amount:      String(pricing.inr),
    addons_amount:    String(addonsTotalInr(ids)),
    addons:           picked.length ? picked.map(a => a.title).join(' | ') : 'none',
    addon_ids:        ids.join(','),
    addon_recordings: ids.includes('recordings') ? 'yes' : 'no',
    addon_demo_call:  ids.includes('demo_call') ? 'yes' : 'no',
  };
}
