import type { Subscription } from './types';

export const getMonthlySubscriptionCost = (subscriptions: Subscription[]) =>
  subscriptions.reduce(
    (total, subscription) =>
      total + (subscription.cycle === 'yearly' ? subscription.amount / 12 : subscription.amount),
    0,
  );

export const getAnnualSubscriptionCost = (subscriptions: Subscription[]) =>
  subscriptions.reduce(
    (total, subscription) =>
      total + (subscription.cycle === 'monthly' ? subscription.amount * 12 : subscription.amount),
    0,
  );
