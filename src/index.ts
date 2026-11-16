import './index.css';
import { categories, sites } from './sites';
import { renderSiteCards } from './site-card';
import { initTheme } from './theme';

initTheme();

function getElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Missing element: ${selector}`);
  }
  return element;
}

const filterItems = [
  { value: 'all' as const, label: '全部', count: sites.length },
  ...categories.map((category) => ({
    value: category,
    label: category,
    count: sites.filter((site) => site.category === category).length,
  })),
];

const filters = getElement<HTMLDivElement>('#filters');
const grid = getElement<HTMLDivElement>('#site-grid');

filters.innerHTML = filterItems
  .map(
    (item, index) => `
      <button
        type="button"
        data-filter="${item.value}"
        aria-pressed="${index === 0}"
        class="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-muted transition-colors hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-canvas"
      >
        ${item.label}
        <span class="font-mono text-[11px] tabular-nums opacity-60">${item.count}</span>
      </button>
    `,
  )
  .join('');

grid.innerHTML = renderSiteCards(sites);

getElement<HTMLSpanElement>('#total-count').textContent = String(sites.length);
getElement<HTMLSpanElement>('#category-count').textContent = String(categories.length);
getElement<HTMLSpanElement>('#year').textContent = String(new Date().getFullYear());

const cards = Array.from(grid.querySelectorAll<HTMLAnchorElement>('[data-category]'));
const filterButtons = Array.from(filters.querySelectorAll<HTMLButtonElement>('[data-filter]'));

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter ?? 'all';

    for (const item of filterButtons) {
      item.setAttribute('aria-pressed', String(item === button));
    }

    for (const card of cards) {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    }
  });
}
