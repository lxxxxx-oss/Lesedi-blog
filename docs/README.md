# Lesedi's Notes — 项目文档

## 功能概述

基于 Astro 构建的个人技术笔记博客，将本地 Typora 笔记（Markdown）转为静态网站，支持层级标签分类和多端自适应浏览。

### 页面

| 页面 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | 个人介绍 + 分类按钮 + 最新笔记列表 |
| 笔记列表 | `/notes` | 大类筛选 → 小标签二次筛选，URL 参数记忆 |
| 笔记详情 | `/notes/[slug]` | 文章内容 + 右侧悬浮目录（TOC），从标题自动生成 |
| 标签总览 | `/tags` | 按大类分组展示标签和所属笔记 |
| 关于 | `/about` | 个人介绍和博客内容说明 |

### 筛选系统

- **大类（category）**：10 个顶层分类（前端、后端、Python、深度学习、Agent/AI、网络、操作系统、编程基础、面试、英语）
- **小标签（tags）**：大类下的具体技术点（如 JavaScript、Vue、React 等）
- 笔记列表页：先选大类 → 展开该大类的小标签 → 精确筛选
- URL 参数：`?category=前端&tag=Vue`

### 响应式适配

| 断点 | 适用设备 |
|------|---------|
| >720px | 桌面 |
| 480–720px | 平板 |
| <480px | 手机（单列布局） |

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Astro](https://astro.build) | 6.x | 静态站点生成 |
| Node.js | >=22.12.0 | 运行环境 |
| Markdown | — | 内容格式，支持代码高亮、表格、图片 |
| CSS | — | Bear Blog 风格，无框架依赖 |
| GitHub Actions | — | 自动构建部署到 GitHub Pages |

### 依赖

```json
{
  "astro": "^6.4.7",
  "@astrojs/mdx": "^6.0.3",
  "@astrojs/rss": "^4.0.18",
  "@astrojs/sitemap": "^3.7.3",
  "sharp": "^0.34.3"
}
```

---

## 目录结构

```
former-force/
├── astro.config.mjs          # Astro 配置（site, base, 字体）
├── tsconfig.json
├── package.json
├── .github/workflows/
│   └── deploy.yml            # GitHub Actions 自动部署
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   └── notes-images/         # 笔记中引用的图片（18 张）
├── src/
│   ├── content/
│   │   ├── content.config.ts # 内容集合 schema 定义
│   │   └── notes/            # 38 篇 Markdown 笔记
│   ├── components/
│   │   ├── BaseHead.astro    # SEO meta 标签
│   │   ├── Header.astro      # 顶部导航
│   │   ├── HeaderLink.astro  # 导航链接（含 active 状态检测）
│   │   ├── Footer.astro      # 页脚
│   │   ├── FormattedDate.astro # 日期格式化
│   │   ├── NoteCard.astro    # 笔记卡片（分类徽章 + 标签）
│   │   ├── TagCloud.astro    # 标签云（字号加权）
│   │   └── TOC.astro         # 文章悬浮目录
│   ├── layouts/
│   │   ├── BlogPost.astro    # 旧博客布局（about 页面在用）
│   │   └── NotePost.astro    # 笔记详情布局（双栏 + TOC）
│   ├── pages/
│   │   ├── index.astro       # 首页
│   │   ├── about.astro       # 关于页
│   │   ├── notes/
│   │   │   ├── index.astro   # 笔记列表（分类筛选）
│   │   │   └── [...slug].astro # 笔记详情动态路由
│   │   └── tags/
│   │       └── index.astro   # 标签总览（按大类分组）
│   ├── assets/               # 字体和占位图片
│   ├── styles/
│   │   └── global.css        # 全局样式 + 响应式断点
│   └── consts.ts             # 站点标题/描述常量
└── docs/                     # 本文档目录
```

---

## 笔记 Frontmatter 规范

新增或修改笔记时，必须遵守以下格式：

```yaml
---
title: JavaScript 基础           # 文章标题（唯一 # 一级标题）
category: 前端                   # 大类：前端/后端/Python/深度学习/Agent AI/网络/操作系统/编程基础/面试/英语/工具
tags: [JavaScript, ES6]          # 具体技术标签，2-4 个
pubDate: 2026-06-17              # 日期
description: JavaScript 核心知识梳理  # 摘要，80 字以内
source: JavaScript基础.md        # 原始文件名（追溯用）
---
```

### 大类参考

| 大类 | 包含范围 |
|------|---------|
| 前端 | JavaScript, CSS, HTML, Vue, React, TypeScript, 微信小程序, WebSocket, Ajax |
| 后端 | Node.js, Express, MySQL, Linux |
| Python | NumPy, PyTorch |
| 深度学习 | 神经网络, 计算机视觉, 机器学习, 消融实验 |
| Agent / AI | LLM, RAG, 智能体 |
| 网络 | HTTP, TCP, DNS |
| 操作系统 | Linux, 计算机系统 |
| 编程基础 | 数据结构, 算法 |
| 面试 | 面经, 复盘 |
| 英语 | CET-4 |
| 工具 | Git, Gulp |

---

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（热更新）
npm run dev
# → http://localhost:4321

# 构建生产版本
npm run build
# → dist/

# 预览构建结果
npm run preview
```

---

## 部署流程

### 自动部署（推荐）

推送到 `master` 分支后，GitHub Actions 自动执行：

1. `npm ci` → 安装依赖
2. `npm run build` → 构建静态文件
3. `actions/upload-pages-artifact` → 上传构建产物
4. `actions/deploy-pages` → 部署到 GitHub Pages

最终 URL：**https://lxxxxx-oss.github.io/Lesedi-blog/**

### 手动部署

```bash
npm run build
# 将 dist/ 目录内容上传到任意静态托管服务
```

---

## 注意事项

### 1. Github Pages base path

`astro.config.mjs` 中 `base: '/Lesedi-blog/'` 必须与仓库名一致。更改仓库名时需同步修改此配置。

### 2. 内部链接必须用 BASE_URL

所有 Astro 组件中的内部链接必须使用 `${base}` 前缀：

```astro
---
const base = import.meta.env.BASE_URL;  // 开发时 '/'，生产时 '/Lesedi-blog/'
---
<a href={`${base}notes/`}>笔记</a>
```

直接写 `href="/notes"` 在 GitHub Pages 项目站点下会跳转到根域名，导致 404。

### 3. 脚本中的 TypeScript

Astro 6 的 `<script>` 标签默认作为 TypeScript 编译。避免在其中使用 `as` 类型断言和 `: string` 类型注解。如需使用纯 JavaScript，用 `is:inline` 但也要注意模板注入变量失效。

### 4. 图片路径

笔记中引用的图片统一放在 `public/notes-images/`，Markdown 中用 `/notes-images/xxx.png` 引用。需要注意 `base` 路径会自动加上 `/Lesedi-blog/` 前缀。

### 5. 新增笔记步骤

1. 在 `src/content/notes/` 下创建 `<slug>.md`
2. 文件名全小写英文 + 连字符（如 `react-hooks.md`）
3. 按上述 Frontmatter 规范填写元数据
4. 运行 `npm run build` 验证无报错
5. 提交推送

### 6. Node.js 版本要求

`package.json` 中 `engines.node >=22.12.0`。GitHub Actions 也配置了 Node 22。本地开发需保持版本一致。

### 7. 已知限制

- 无暗色模式
- 无全文搜索（依赖标签筛选）
- 无评论系统
- RSS 仅覆盖笔记内容
