import { icons } from './icons';
import type { Category, Site } from './sites';

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

export function renderSiteCard(site: Site): string {
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
}

export function renderSiteCards(siteList: readonly Site[]): string {
  return siteList.map((site) => renderSiteCard(site)).join('');
}
