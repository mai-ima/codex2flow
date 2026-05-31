export type IconName = 'wallet' | 'calendar' | 'chart' | 'spark' | 'shield' | 'card';

const paths: Record<IconName, string> = {
  wallet: 'M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v10.5A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-10Zm13 5h3v4h-3a2 2 0 1 1 0-4ZM6.5 5A2.5 2.5 0 0 0 4 7.5h13',
  calendar: 'M7 3v4M17 3v4M4.5 9h15M6.5 5h11A2.5 2.5 0 0 1 20 7.5v10A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-10A2.5 2.5 0 0 1 6.5 5Z',
  chart: 'M5 19V5m0 14h14M8 15l3-3 2 2 5-7',
  spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z',
  shield: 'M12 3l7 3v5.5c0 4.2-2.8 7.2-7 8.5-4.2-1.3-7-4.3-7-8.5V6l7-3Z',
  card: 'M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Zm0 2.5h16',
};

export const icon = (name: IconName, className = '') => `
  <svg class="${className}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="${paths[name]}" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
`;
