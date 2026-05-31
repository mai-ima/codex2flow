export type AdSlot = {
  id: string;
  placement: 'dashboard-inline' | 'settings-footer';
  label: string;
  maxHeight: number;
};

export const adSlots: AdSlot[] = [
  {
    id: 'ad-dashboard-01',
    placement: 'dashboard-inline',
    label: 'Sponsored insight',
    maxHeight: 92,
  },
];
