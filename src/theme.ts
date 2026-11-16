const THEME_KEY = 'denohub-theme';
const root = document.documentElement;
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
const themeToggle = document.querySelector<HTMLButtonElement>('#theme-toggle');

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

export function initTheme() {
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
}
