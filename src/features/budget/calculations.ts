import type { Transaction } from './types';

export const sumByType = (transactions: Transaction[], type: Transaction['type']) =>
  transactions
    .filter((transaction) => transaction.type === type)
    .reduce((total, transaction) => total + transaction.amount, 0);

export const getBalance = (transactions: Transaction[]) =>
  sumByType(transactions, 'income') - sumByType(transactions, 'expense');

export const getCategoryBreakdown = (transactions: Transaction[]) => {
  const expenses = transactions.filter((transaction) => transaction.type === 'expense');
  const total = expenses.reduce((sum, transaction) => sum + transaction.amount, 0);

  return Object.entries(
    expenses.reduce<Record<string, number>>((groups, transaction) => {
      groups[transaction.category] = (groups[transaction.category] ?? 0) + transaction.amount;
      return groups;
    }, {}),
  )
    .map(([category, amount]) => ({
      category,
      amount,
      share: total === 0 ? 0 : Math.round((amount / total) * 100),
    }))
    .sort((a, b) => b.amount - a.amount);
};
