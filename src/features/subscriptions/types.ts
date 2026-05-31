export type BillingCycle = 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'review' | 'cancel-planned';

export type Subscription = {
  id: string;
  serviceName: string;
  amount: number;
  cycle: BillingCycle;
  renewalDate: string;
  paymentMethod: string;
  status: SubscriptionStatus;
  category: string;
};
