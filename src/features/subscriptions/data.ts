import type { Subscription } from './types';

export const subscriptions: Subscription[] = [
  {
    id: 'sub-001',
    serviceName: 'iCloud+',
    amount: 400,
    cycle: 'monthly',
    renewalDate: '2026-06-02',
    paymentMethod: 'Apple Pay',
    status: 'active',
    category: 'Storage',
  },
  {
    id: 'sub-002',
    serviceName: 'Music Studio',
    amount: 1480,
    cycle: 'monthly',
    renewalDate: '2026-06-12',
    paymentMethod: 'Visa ending 1028',
    status: 'review',
    category: 'Creative',
  },
  {
    id: 'sub-003',
    serviceName: 'Design Library',
    amount: 12000,
    cycle: 'yearly',
    renewalDate: '2026-09-01',
    paymentMethod: 'Mastercard ending 4040',
    status: 'active',
    category: 'Work',
  },
  {
    id: 'sub-004',
    serviceName: 'Video Plus',
    amount: 990,
    cycle: 'monthly',
    renewalDate: '2026-06-20',
    paymentMethod: 'Apple Pay',
    status: 'cancel-planned',
    category: 'Entertainment',
  },
];
