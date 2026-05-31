import { icon, type IconName } from '../components/Icon';
import { adSlots } from '../features/ads/adSlots';
import { getBalance, getCategoryBreakdown, sumByType } from '../features/budget/calculations';
import { monthlyBudget, spendingTrend, transactions } from '../features/budget/data';
import { appPlans } from '../features/billing/plans';
import { getAnnualSubscriptionCost, getMonthlySubscriptionCost } from '../features/subscriptions/calculations';
import { subscriptions } from '../features/subscriptions/data';
import { compactCurrencyFormatter, currencyFormatter, dateFormatter } from '../shared/formatters';

const categoryLabels: Record<string, string> = {
  salary: '給与',
  food: '食費',
  transport: '交通',
  home: '住居',
  entertainment: '娯楽',
  health: '健康',
  education: '学習',
  other: 'その他',
};

const statusLabels = {
  active: '継続中',
  review: '見直し候補',
  'cancel-planned': '解約予定',
};

const metricCard = (label: string, value: string, helper: string, iconName: IconName, tone = 'neutral') => `
  <article class="metric metric--${tone}">
    <div class="metric__icon">${icon(iconName)}</div>
    <div><p>${label}</p><strong>${value}</strong><span>${helper}</span></div>
  </article>
`;

export function renderApp() {
  const income = sumByType(transactions, 'income');
  const expenses = sumByType(transactions, 'expense');
  const balance = getBalance(transactions);
  const budgetUsage = Math.round((expenses / monthlyBudget.limit) * 100);
  const monthlySubscriptions = getMonthlySubscriptionCost(subscriptions);
  const annualSubscriptions = getAnnualSubscriptionCost(subscriptions);
  const breakdown = getCategoryBreakdown(transactions);
  const maxTrend = Math.max(...spendingTrend.map((trend) => trend.amount));

  return `
    <div class="app-shell">
      <header class="hero">
        <nav class="topbar" aria-label="メインナビゲーション">
          <a class="brand" href="#top" aria-label="cash flow ホーム"><span class="brand__mark">${icon('spark')}</span><span>cash flow <small>仮</small></span></a>
          <div class="topbar__links"><a href="#budget">家計簿</a><a href="#subscriptions">サブスク</a><a href="#billing">プラン</a></div>
        </nav>
        <div class="hero__grid" id="top">
          <div class="hero__copy">
            <p class="eyebrow">Budgeting and subscription care</p>
            <h1>毎月のお金を、静かに、美しく、迷わず整える。</h1>
            <p class="hero__lead">cash flow（仮）は、家計簿とサブスクリプション管理を一体化したWebアプリです。Apple製品のような明快さを参考に、入力・確認・見直しの流れを最短にします。</p>
            <div class="hero__actions"><a class="button button--primary" href="#budget">ダッシュボードを見る</a><a class="button button--ghost" href="#subscriptions">更新日を確認</a></div>
          </div>
          <section class="card card--glass balance-card">
            <div class="balance-card__top"><span>今月の残高</span>${icon('wallet')}</div>
            <strong>${currencyFormatter.format(balance)}</strong>
            <div class="balance-card__meta"><span>収入 ${currencyFormatter.format(income)}</span><span>支出 ${currencyFormatter.format(expenses)}</span></div>
            <div class="progress" aria-label="予算使用率 ${budgetUsage}%"><span style="width: ${budgetUsage}%"></span></div>
            <p>予算上限の ${budgetUsage}% を使用。目標貯蓄まであと ${currencyFormatter.format(monthlyBudget.targetSavings - balance)}。</p>
          </section>
        </div>
      </header>
      <main>
        <section class="metrics" aria-label="月次サマリー">
          ${metricCard('月間支出', currencyFormatter.format(expenses), '固定費と変動費を合算', 'chart')}
          ${metricCard('サブスク月換算', currencyFormatter.format(monthlySubscriptions), `年額 ${currencyFormatter.format(annualSubscriptions)}`, 'calendar', 'warning')}
          ${metricCard('貯蓄余力', currencyFormatter.format(balance), '今月の収入から支出を差引', 'shield', 'positive')}
        </section>
        <section class="dashboard-grid" id="budget">
          <section class="card panel-large">
            <div class="section-heading"><div><p class="eyebrow">Household ledger</p><h2>支出推移</h2></div><button class="text-button" type="button">取引を追加</button></div>
            <div class="trend-chart" aria-label="過去5か月の支出推移">${spendingTrend.map((trend) => `<div class="trend-chart__item"><span style="height: ${(trend.amount / maxTrend) * 100}%"></span><small>${trend.month}</small></div>`).join('')}</div>
          </section>
          <section class="card">
            <div class="section-heading section-heading--compact"><div><p class="eyebrow">Categories</p><h2>カテゴリ分類</h2></div></div>
            <div class="category-list">${breakdown.map((item) => `<div class="category-row"><div><strong>${categoryLabels[item.category]}</strong><span>${item.share}%</span></div><p>${currencyFormatter.format(item.amount)}</p></div>`).join('')}</div>
          </section>
          <section class="card panel-large">
            <div class="section-heading"><div><p class="eyebrow">Transactions</p><h2>最近の入出金</h2></div><button class="text-button" type="button">CSV出力</button></div>
            <div class="transaction-list">${transactions.map((transaction) => `<article class="transaction"><div class="transaction__icon">${icon(transaction.type === 'income' ? 'wallet' : 'card')}</div><div><strong>${transaction.title}</strong><span>${categoryLabels[transaction.category]} · ${dateFormatter.format(new Date(transaction.date))}</span></div><p class="${transaction.type === 'income' ? 'amount-positive' : ''}">${transaction.type === 'income' ? '+' : '-'}${currencyFormatter.format(transaction.amount)}</p></article>`).join('')}</div>
          </section>
        </section>
        <section class="ad-band" aria-label="広告枠">${adSlots.map((slot) => `<div class="ad-band__slot" style="min-height: ${slot.maxHeight}px"><span>${slot.label}</span><p>あなたの判断を邪魔しない、低頻度・小面積の広告配置を想定しています。</p></div>`).join('')}</section>
        <section class="subscriptions" id="subscriptions">
          <div class="section-heading"><div><p class="eyebrow">Subscriptions</p><h2>更新前に、必要なものだけ残す。</h2></div><button class="button button--dark" type="button">サブスクを追加</button></div>
          <div class="subscription-grid">${subscriptions.map((subscription) => `<section class="card subscription-card"><div class="subscription-card__top"><span>${subscription.category}</span><span class="status status--${subscription.status}">${statusLabels[subscription.status]}</span></div><h3>${subscription.serviceName}</h3><strong>${subscription.cycle === 'yearly' ? `${compactCurrencyFormatter.format(subscription.amount)} / 年` : `${currencyFormatter.format(subscription.amount)} / 月`}</strong><dl><div><dt>更新日</dt><dd>${dateFormatter.format(new Date(subscription.renewalDate))}</dd></div><div><dt>支払い</dt><dd>${subscription.paymentMethod}</dd></div></dl></section>`).join('')}</div>
        </section>
        <section class="billing" id="billing">
          <div class="section-heading section-heading--center"><p class="eyebrow">Monetization ready</p><h2>良心的な収益化を前提にした、ひとつの完成プラン。</h2><p>無料体験を壊さず、広告・有料機能・将来のネイティブアプリ連携を機能単位で拡張できます。</p></div>
          <div class="plan-grid">${appPlans.map((plan) => `<section class="card card--${plan.id === 'plus' ? 'dark' : 'default'}"><span class="plan-name">${plan.name}</span><strong>${plan.priceLabel}</strong><p>${plan.description}</p><ul>${plan.features.map((feature) => `<li>${feature}</li>`).join('')}</ul></section>`).join('')}</div>
        </section>
      </main>
    </div>
  `;
}
