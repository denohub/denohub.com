# denohub

denohub 子站导航，统一访问游戏、开发与 AI 方向的子站。

线上地址：<https://denohub.com>

## 功能

- 全部子站以卡片展示，按游戏 / 开发 / AI 分类
- 分类筛选，子站数量自动统计
- 亮色 / 暗色主题，首次跟随系统，之后记忆选择
- 响应式布局：手机单列、平板两列、桌面三列
- 「关于」页面，介绍 Denohub 定位并列出全部子站
- Google AdSense 加载脚本与 `ads.txt`

## 技术栈

- [Rsbuild](https://rsbuild.rs/) 2
- [Tailwind CSS](https://tailwindcss.com/) 4
- TypeScript

## 开始

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

开发服务器默认运行在 `http://localhost:3000`。

## 命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建到 `dist/` |
| `npm run preview` | 预览构建产物 |
| `npm run typecheck` | TypeScript 类型检查 |

## 目录结构

```text
src/
  sites.ts       子站数据（唯一数据源）
  site-card.ts   子站卡片渲染与分类样式
  icons.ts       分类图标
  theme.ts       亮暗主题切换
  index.ts       首页入口
  about.ts       关于页入口
  index.html     首页模板
  about.html     关于页模板
  index.css      Tailwind 与设计变量
public/
  favicon.svg
  ads.txt
rsbuild.config.ts
```

## 添加子站

编辑 [`src/sites.ts`](src/sites.ts)，在 `sites` 数组中按分类分组插入：

```ts
{
  name: 'example',
  url: 'https://example.denohub.com',
  category: '开发',
  description: '一句话说明这个子站做什么。',
},
```

- `name`：子域名前缀，不要带协议和域名
- `url`：完整 HTTPS 地址
- `category`：`游戏`、`开发` 或 `AI`
- `description`：中文一句话，不超过两行

首页和关于页都从同一份数据渲染，无需分别修改。新增站点后运行：

```bash
npm run typecheck
npm run build
```

## 主题

主题保存在 `localStorage` 的 `denohub-theme` 键中。首次访问跟随系统偏好，点击右上角图标切换。页面内联脚本会在首屏渲染前应用主题，避免闪烁。

## 部署

```bash
npm run build
```

将 `dist/` 部署到 `denohub.com` 根目录。需要保证以下文件可访问：

- `/index.html`
- `/about.html`
- `/ads.txt`
- `/favicon.svg`

## AI 助手

仓库根目录的 [`AGENTS.md`](AGENTS.md) 说明了让 AI 添加子站、调整分类和验证改动的流程。
