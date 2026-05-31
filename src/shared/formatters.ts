import { userPreferences } from '../features/settings/preferences';

export const currencyFormatter = new Intl.NumberFormat(userPreferences.locale, {
  style: 'currency',
  currency: userPreferences.currency,
  maximumFractionDigits: 0,
});

export const compactCurrencyFormatter = new Intl.NumberFormat(userPreferences.locale, {
  style: 'currency',
  currency: userPreferences.currency,
  notation: 'compact',
  maximumFractionDigits: 1,
});

export const dateFormatter = new Intl.DateTimeFormat(userPreferences.locale, {
  month: 'short',
  day: 'numeric',
});
