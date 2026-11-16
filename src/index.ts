import './index.css';
import { icons } from './icons';
import { categories, sites, type Category } from './sites';

const THEME_KEY = 'denohub-theme';
const root = document.documentElement;
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const themeToggle = document.querySelector<HTMLButtonElement>('#theme-toggle');
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

function getElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Missing element: ${selector}`);
  }
  return element;
}

function readStoredTheme(): 'light' | 'dark' | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(dark: boolean, animate = false) {
  if (animate) {
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 200);
  }

  root.classList.toggle('dark', dark);

  if (themeColor) {
    themeColor.content = dark ? '#000000' : '#fafafa';
  }

  if (themeToggle) {
    const label = dark ? '切换到亮色模式' : '切换到暗色模式';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.title = label;
  }
}

applyTheme(root.classList.contains('dark'));

themeToggle?.addEventListener('click', () => {
  const dark = !root.classList.contains('dark');

  try {
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  } catch {
    // localStorage 不可用时，主题只在当前页面生效
  }

  applyTheme(dark, true);
});

systemTheme.addEventListener('change', (event) => {
  if (readStoredTheme() === null) {
    applyTheme(event.matches, true);
  }
});

const categoryStyles: Record<Category, { icon: string; tile: string; dot: string }> = {
  游戏: {
    icon: icons.gamepad,
    tile: 'border-violet-500/25 bg-violet-500/10 text-violet-600 dark:border-violet-400/25 dark:bg-violet-400/10 dark:text-violet-300',
    dot: 'bg-violet-500 dark:bg-violet-400',
  },
  开发: {
    icon: icons.code,
    tile: 'border-blue-500/25 bg-blue-500/10 text-blue-600 dark:border-blue-400/25 dark:bg-blue-400/10 dark:text-blue-300',
    dot: 'bg-blue-500 dark:bg-blue-400',
  },
  AI: {
    icon: icons.sparkles,
    tile: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
  },
};

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

grid.innerHTML = sites
  .map((site) => {
    const style = categoryStyles[site.category];
    const domain = new URL(site.url).hostname;

    return `
      <a
        href="${site.url}"
        target="_blank"
        rel="noopener noreferrer"
        data-category="${site.category}"
        class="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        <div class="flex items-start justify-between gap-4">
          <span
            class="flex size-10 shrink-0 items-center justify-center rounded-lg border ${style.tile}"
            aria-hidden="true"
          >
            ${style.icon}
          </span>
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-[11px] font-medium text-muted"
          >
            <span class="size-1.5 rounded-full ${style.dot}" aria-hidden="true"></span>
            ${site.category}
          </span>
        </div>
        <div class="mt-5 flex items-center justify-between gap-3">
          <span class="text-[15px] font-semibold tracking-tight">${site.name}</span>
          <span class="text-subtle transition-colors group-hover:text-fg">
            ${icons.arrowUpRight}
          </span>
        </div>
        <span class="mt-0.5 block font-mono text-xs text-subtle">${domain}</span>
        <p class="mt-3 text-[13px] leading-relaxed text-muted line-clamp-2">${site.description}</p>
        <span class="sr-only">（在新窗口打开）</span>
      </a>
    `;
  })
  .join('');

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
