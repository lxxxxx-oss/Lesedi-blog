# Typora 笔记 → 个人博客 设计文档

**日期**: 2026-06-17
**状态**: 已确认

---

## 1. 目标

将用户本地的 Typora 笔记（`C:\Users\Lesedi\Desktop\Typora笔记`，共约 39 篇 Markdown 文件）集成到 Astro 博客项目中，按**标签/关键词**组织，通过润色后以静态博客形式在线展示。

---

## 2. 目录结构

```
src/
├── content/
│   ├── notes/              ← 润色后的笔记 md（带 frontmatter + 标签）
│   │   ├── javascript-basics.md
│   │   ├── vue-basics.md
│   │   ├── agent-interview.md
│   │   └── ...（~39 篇）
│   └── content.config.ts   ← 新增 notes 集合定义
├── pages/
│   ├── index.astro         ← 改造：个人介绍 + 标签云 + 最新笔记
│   ├── notes/
│   │   ├── index.astro     ← 笔记列表页（支持 ?tag= 筛选）
│   │   └── [...slug].astro ← 笔记详情页
│   └── tags/
│       └── index.astro     ← 标签总览页（标签云）
├── styles/
│   └── global.css          ← 新增笔记相关样式
└── public/
    └── notes-images/       ← 笔记图片统一存放到此
```

---

## 3. 页面清单（4 个）

### 3.1 首页 `/`
- 个人介绍区 + 社交链接
- 标签云（全部标签，按数量加权大小）
- 最新笔记列表（前 5 篇，带摘要）

### 3.2 笔记列表页 `/notes`
- 全部笔记按 pubDate 倒序排列
- 顶部标签筛选栏：点击标签 → URL 参数 `?tag=TagName`
- 笔记卡片：标题、摘要（description）、日期、标签徽章

### 3.3 笔记详情页 `/notes/[slug]`
- 左侧文章内容区
- 右侧悬浮目录（TOC），从 Markdown 标题自动生成
- 底部标签链接（点标签 → `/notes?tag=XXX`）
- 上一页/下一页导航

### 3.4 标签总览页 `/tags`
- 标签云（字号与笔记数量正相关）
- 点击标签 → 跳转 `/notes?tag=XXX`

---

## 4. 数据层

### 4.1 Astro Content Collection

```ts
// content.config.ts 新增
const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    description: z.string(),
    source: z.string().optional(),   // 原始文件名，追溯用
  }),
});
```

### 4.2 Frontmatter 格式

```yaml
---
title: JavaScript 基础
tags: [JavaScript, 前端, 编程基础]
pubDate: 2026-06-17
description: JavaScript 数据类型、作用域、闭包等核心概念梳理
source: JavaScript基础.md
---
```

- `title`：提取自原文第一个 `#` 标题，可适当精简
- `tags`：润色时人工标注，每篇 1-5 个标签
- `pubDate`：统一设为润色完成日期
- `description`：手写或从开头段落提取，80 字以内
- `source`：保留原始文件名，方便追溯

---

## 5. 润色规则（每篇笔记）

1. **标题规范化**：全文只保留一个 `#` 一级标题（即文章标题），原有多余的 `#` 降级
2. **错别字/语病**：修正错误，不改原意
3. **代码块语言标注**：检查并补全代码块的 `language` 标识
4. **过长分节**：超过约 300 行的笔记，在逻辑断点插入二级标题 `##` 拆分
5. **图片路径统一**：`![xxx](./subdir/img.png)` → `![xxx](/notes-images/img.png)`，图片实际文件集中拷贝到 `public/notes-images/`
6. **补充元数据**：写入 frontmatter（标题 + 日期 + 标签 + 摘要）

---

## 6. 技术实现要点

- **标签聚合**：通过 `getCollection('notes')` 获取全部笔记，`flatMap` 收集所有标签去重
- **列表筛选**：读取 `Astro.url.searchParams.get('tag')`，过滤 `tags` 数组包含该标签的笔记
- **TOC 生成**：渲染后从 Markdown 的 `#` 标题提取层级，用 IntersectionObserver 高亮当前位置
- **路由**：`/notes/[slug]` 做静态生成（SSG），标签筛选页用 `Astro.url` 做客户端过滤（静态生成所有笔记，标签筛选在前端做）
- **图片处理**：笔记原始图片拷贝到 `public/notes-images/`（可去重命名以避免冲突）

---

## 7. 首页导航入口

在 `Header.astro` 导航中新增：
- 「📝 笔记」→ `/notes`
- 「🏷️ 标签」→ `/tags`

---

## 8. 不纳入范围

- 搜索功能（可后续加）
- 暗色模式（保留现有样式即可）
- 评论系统
- RSS feed（现有模板已支持 blog 的 RSS，笔记暂不加入）

---

## 9. 执行顺序

1. 润色全部 39 篇笔记，写入 `src/content/notes/`，提取标签和图片
2. 创建 `content.config.ts` 中 notes 集合
3. 实现笔记列表页 `/notes`
4. 实现笔记详情页 `/notes/[slug]`
5. 实现标签页 `/tags`
6. 改造首页 `/`
7. 更新导航 `Header.astro`
8. 构建验证 → 运行验证
