import type { MonthlyBudget, Transaction } from './types';

export const monthlyBudget: MonthlyBudget = {
  limit: 248000,
  targetSavings: 85000,
};

export const transactions: Transaction[] = [
  {
    id: 'tx-001',
    title: '給与',
    amount: 420000,
    type: 'income',
    category: 'salary',
    date: '2026-05-25',
  },
  {
    id: 'tx-002',
    title: '食料品',
    amount: 13200,
    type: 'expense',
    category: 'food',
    date: '2026-05-27',
  },
  {
    id: 'tx-003',
    title: '家賃',
    amount: 128000,
    type: 'expense',
    category: 'home',
    date: '2026-05-01',
  },
  {
    id: 'tx-004',
    title: '交通系IC',
    amount: 8000,
    type: 'expense',
    category: 'transport',
    date: '2026-05-18',
  },
  {
    id: 'tx-005',
    title: '映画と書籍',
    amount: 6200,
    type: 'expense',
    category: 'entertainment',
    date: '2026-05-20',
  },
];

export const spendingTrend = [
  { month: '1月', amount: 214000 },
  { month: '2月', amount: 226000 },
  { month: '3月', amount: 203000 },
  { month: '4月', amount: 238000 },
  { month: '5月', amount: 155400 },
];
