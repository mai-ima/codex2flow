export type AppPlan = {
  id: 'free' | 'plus';
  name: string;
  priceLabel: string;
  description: string;
  features: string[];
};

export const appPlans: AppPlan[] = [
  {
    id: 'free',
    name: 'Free',
    priceLabel: '¥0',
    description: '広告は控えめに、基本の家計簿とサブスク管理を提供します。',
    features: ['月次サマリー', 'サブスク一覧', '控えめな広告枠'],
  },
  {
    id: 'plus',
    name: 'Plus',
    priceLabel: '将来提供予定',
    description: '広告非表示、詳細分析、共有、ネイティブアプリ連携を想定した拡張プランです。',
    features: ['広告非表示', '高度な予算分析', '複数デバイス同期'],
  },
];
