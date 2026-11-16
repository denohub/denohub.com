# AGENTS.md

面向 AI 编码助手的维护说明。目标：安全、低成本地添加或调整 denohub 子站。

## 项目概览

- 技术栈：Rsbuild 2 + Tailwind CSS 4 + TypeScript
- 首页：`/`，子站卡片与分类筛选
- 关于页：`/about.html`，定位介绍与完整子站列表
- 子站数据唯一来源：`src/sites.ts`
- 构建产物：`dist/`，部署到 denohub.com 根目录

## 添加子站（标准流程）

1. 先访问目标子站或使用用户提供的资料，确认它实际提供的内容，不要编造功能。
2. 打开 `src/sites.ts`，在 `sites` 数组中找到对应分类的位置插入新对象。
3. 字段必须完整：

```ts
{
  name: 'example',
  url: 'https://example.denohub.com',
  category: '开发',
  description: '一句话说明子站内容。',
}
```

4. 运行 `npm run typecheck` 和 `npm run build`。
5. 在浏览器检查 `/` 与 `/about.html`：
   - 新卡片出现，简介不超过两行
   - 总数与分类计数正确
   - 对应分类筛选包含新卡片
   - 亮色和暗色都正常
   - 375px 宽度无横向溢出

禁止手动在 HTML 中复制卡片；首页和关于页都由 `renderSiteCards(sites)` 渲染。

## 字段规范

| 字段 | 规范 |
| --- | --- |
| `name` | 子域名前缀，小写，如 `recomp`；不要写协议或 `.denohub.com` |
| `url` | 完整 `https://<name>.denohub.com`；必须是合法 URL |
| `category` | 只能是 `游戏`、`开发`、`AI` |
| `description` | 中文一句话，说明实际内容，约 15–40 字，以 `。` 结尾 |
| 顺序 | 保持按分类分组，与 `categories` 的顺序一致 |

`description` 会作为 HTML 插入，保持纯文本，不要写 `<`、`>` 或 HTML 标签。

## 分类规则

现有分类定义在 `src/sites.ts` 的 `categories`，卡片样式在 `src/site-card.ts` 的 `categoryStyles`。

优先使用现有分类。确实需要新分类时：

1. 在 `categories` 中追加分类。
2. 在 `categoryStyles` 中补充 `icon`、`tile`、`dot`。
3. 如现有图标不合适，在 `src/icons.ts` 增加图标。
4. 运行类型检查；筛选按钮和计数会自动生成。

## 设计与实现约束

- 保持 Vercel / GitHub 风格：中性色、细分隔线、克制的强调色。
- 使用现有设计 token：`bg-canvas`、`bg-surface`、`border-line`、`text-muted` 等，不要新增硬编码颜色。
- 不引入新依赖，除非任务明确需要。
- 新站点不需要单独图标，卡片图标由分类决定。
- 不要手动维护总数或分类数；它们由 `sites` 自动计算并在运行时写入。
- 不要修改 `dist/` 或 `node_modules/`。
- 除非任务明确要求，不要改动 AdSense 脚本或 `ads.txt`。
- UI 文案使用中文；代码标识符使用英文；注释保持中文。

## 改动范围

添加一个普通子站的最小改动是：

- `src/sites.ts`

以下情况才需要改其他文件：

- 新分类：`src/sites.ts`、`src/site-card.ts`，必要时 `src/icons.ts`
- 卡片结构或样式：`src/site-card.ts`、`src/index.css`
- 页面文案或结构：`src/index.html`、`src/about.html`
- 主题行为：`src/theme.ts`

## 验证清单

```bash
npm run typecheck
npm run build
```

构建后确认：

- `dist/index.html` 与 `dist/about.html` 均正常生成
- `dist/ads.txt` 存在
- 首页筛选、计数、主题切换正常
- 关于页子站列表与首页一致
- 手机宽度无横向滚动

## 提交

如任务要求提交，使用英文 Conventional Commits，例如：

```text
feat: add example sub-site
fix: correct site category
```

提交前确认 `git status` 只包含本次相关文件；不要提交 `dist/` 或 `node_modules/`。
