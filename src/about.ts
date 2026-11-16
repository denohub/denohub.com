import './index.css';
import { sites } from './sites';
import { renderSiteCards } from './site-card';
import { initTheme } from './theme';

initTheme();

const grid = document.querySelector<HTMLDivElement>('#site-grid');
if (grid) {
  grid.innerHTML = renderSiteCards(sites);
}

const siteCount = document.querySelector<HTMLSpanElement>('#site-count');
if (siteCount) {
  siteCount.textContent = String(sites.length);
}

const year = document.querySelector<HTMLSpanElement>('#year');
if (year) {
  year.textContent = String(new Date().getFullYear());
}
