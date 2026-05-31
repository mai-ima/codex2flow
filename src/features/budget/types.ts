export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'salary'
  | 'food'
  | 'transport'
  | 'home'
  | 'entertainment'
  | 'health'
  | 'education'
  | 'other';

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  note?: string;
};

export type MonthlyBudget = {
  limit: number;
  targetSavings: number;
};
