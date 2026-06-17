# Typora 笔记集成到博客 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将用户 39 篇 Typora 笔记润色后集成到 Astro 博客，按标签组织，支持列表/详情/标签筛选。

**Architecture:** 使用 Astro Content Collections 管理笔记，笔记 md 文件写入 `src/content/notes/`，通过 4 个页面（首页、列表、详情、标签页）展示。标签筛选在前端通过 URL 参数实现。

**Tech Stack:** Astro v6, Markdown, CSS（匹配现有 Bear Blog 风格）

---

## 文件结构总览

```
Create:
  src/content/notes/*.md          (~39 files, 润色后的笔记)
  public/notes-images/*            (笔记引用的图片)
  src/pages/notes/index.astro      (笔记列表页)
  src/pages/notes/[...slug].astro  (笔记详情页)
  src/pages/tags/index.astro       (标签总览页)
  src/components/NoteCard.astro    (笔记卡片组件)
  src/components/TagCloud.astro    (标签云组件)
  src/components/TOC.astro         (文章目录组件)
  src/layouts/NotePost.astro       (笔记详情布局)

Modify:
  src/content.config.ts            (新增 notes 集合)
  src/pages/index.astro            (改造首页)
  src/components/Header.astro      (新增导航链接)
  src/consts.ts                    (更新站点信息)
  src/styles/global.css            (新增笔记/标签相关样式)
```

---

### Task 1: 配置笔记内容集合

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/consts.ts`

- [ ] **Step 1: 在 content.config.ts 中新增 notes 集合定义**

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const notes = defineCollection({
	loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()).default([]),
		pubDate: z.coerce.date(),
		description: z.string(),
		source: z.string().optional(),
	}),
});

export const collections = { blog, notes };
```

- [ ] **Step 2: 更新 consts.ts 站点信息**

```ts
export const SITE_TITLE = "Lesedi's Notes";
export const SITE_DESCRIPTION = 'Personal notes and learning journal';
```

- [ ] **Step 3: 验证配置**

Run: `npx astro build`
Expected: 成功构建（notes 目录为空时不会有错误）

- [ ] **Step 4: 提交**

```bash
git add src/content.config.ts src/consts.ts
git commit -m "feat: add notes content collection and update site info"
```

---

### Task 2: 润色并写入笔记 — 第 1 批（本科阶段 · 前端类 ~10篇）

**Files:**
- Create: `src/content/notes/javascript-basics.md`
- Create: `src/content/notes/css.md`
- Create: `src/content/notes/ecmascript6.md`
- Create: `src/content/notes/html-http.md`
- Create: `src/content/notes/vue-basics.md`
- Create: `src/content/notes/vue3.md`
- Create: `src/content/notes/ajax.md`
- Create: `src/content/notes/websocket.md`
- Create: `src/content/notes/socket-io.md`
- Create: `src/content/notes/typescript.md`

- [ ] **Step 1: 逐篇润色并写入**

对 `本科阶段/` 下的每篇笔记，执行以下润色流程：

**润色规则：**
1. 读原文，保持第一个 `#` 标题为文章唯一一级标题
2. 修正错别字和语法错误
3. 检查代码块语言标注（```js, ```html, ```css 等）
4. 超过 ~300 行的内容在逻辑断点用 `##` 拆分
5. 如果有本地图片引用，改为 `/notes-images/xxx.png`
6. 补充 frontmatter：`title`, `tags`, `pubDate`, `description`, `source`

**用 Agent 逐篇处理，每篇单独写入 `src/content/notes/<slug>.md`。**

每篇 frontmatter 模板：
```yaml
---
title: JavaScript 基础
tags: [JavaScript, 前端, 编程基础]
pubDate: 2026-06-17
description: JavaScript 数据类型、作用域、闭包等核心概念梳理
source: JavaScript基础.md
---
```

**slug 命名规则：** 英文小写 + 连字符，如 `JavaScript基础.md` → `javascript-basics.md`

- [ ] **Step 2: 验证构建**

Run: `npx astro build`
Expected: 构建成功，无 Markdown 解析错误

- [ ] **Step 3: 提交**

```bash
git add src/content/notes/
git commit -m "feat: add batch 1 notes - undergrad frontend topics"
```

---

### Task 3: 润色并写入笔记 — 第 2 批（本科阶段 · 后端/基础类 ~11篇）

**Files:**
- Create: `src/content/notes/linux.md`
- Create: `src/content/notes/mysql.md`
- Create: `src/content/notes/nodejs.md`
- Create: `src/content/notes/node-gulp.md`
- Create: `src/content/notes/express.md`
- Create: `src/content/notes/data-structures.md`
- Create: `src/content/notes/cs-deep-dive.md`
- Create: `src/content/notes/wechat-miniprogram.md`
- Create: `src/content/notes/cet4.md`
- Create: `src/content/notes/essential-tidbits.md`
- Create: `src/content/notes/odds-and-ends.md`

- [ ] **Step 1: 逐篇润色并写入**（同 Task 2 流程）

- [ ] **Step 2: 验证构建**

Run: `npx astro build`
Expected: 构建成功

- [ ] **Step 3: 提交**

```bash
git add src/content/notes/
git commit -m "feat: add batch 2 notes - undergrad backend & fundamentals"
```

---

### Task 4: 润色并写入笔记 — 第 3 批（研究生阶段 ~9篇）

**Files:**
- Create: `src/content/notes/numpy.md`
- Create: `src/content/notes/pytorch.md`
- Create: `src/content/notes/react.md`
- Create: `src/content/notes/git-commands.md`
- Create: `src/content/notes/cs-basics.md`
- Create: `src/content/notes/ablation-study.md`
- Create: `src/content/notes/computer-vision-cs231n.md`
- Create: `src/content/notes/agent-core-components.md`

- [ ] **Step 1: 逐篇润色并写入**

特别注意：研究生阶段的笔记引用了子文件夹中的图片（React图片/、图片资源_1/），需要：
1. 将图片文件拷贝到 `public/notes-images/`
2. 更新 Markdown 中的图片路径为 `/notes-images/xxx.png`

- [ ] **Step 2: 拷贝图片到 public/notes-images/**

```bash
mkdir -p public/notes-images
cp "C:/Users/Lesedi/Desktop/Typora笔记/研究生阶段/React图片/"* public/notes-images/
cp "C:/Users/Lesedi/Desktop/Typora笔记/研究生阶段/图片资源_1/"* public/notes-images/
```

- [ ] **Step 3: 验证构建**

Run: `npx astro build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
git add src/content/notes/ public/notes-images/
git commit -m "feat: add batch 3 notes - graduate topics with images"
```

---

### Task 5: 润色并写入笔记 — 第 4 批（面经 ~9篇）

**Files:**
- Create: `src/content/notes/agent-interview.md`
- Create: `src/content/notes/css-interview.md`
- Create: `src/content/notes/es6-interview.md`
- Create: `src/content/notes/javascript-interview.md`
- Create: `src/content/notes/vue-interview.md`
- Create: `src/content/notes/low-code-platform.md`
- Create: `src/content/notes/zhijian-campus.md`
- Create: `src/content/notes/networking-interview.md`
- Create: `src/content/notes/interview-review.md`

- [ ] **Step 1: 逐篇润色并写入**（同 Task 2 流程）

面经中 `Agent面经.md` 很长（含两篇文章），需要拆分或合理分节。

- [ ] **Step 2: 验证构建**

Run: `npx astro build`
Expected: 构建成功

- [ ] **Step 3: 提交**

```bash
git add src/content/notes/
git commit -m "feat: add batch 4 notes - interview experience"
```

---

### Task 6: 创建组件 — NoteCard, TagCloud, TOC

**Files:**
- Create: `src/components/NoteCard.astro`
- Create: `src/components/TagCloud.astro`
- Create: `src/components/TOC.astro`

- [ ] **Step 1: 创建 NoteCard 组件**

```astro
---
import type { CollectionEntry } from 'astro:content';
import FormattedDate from './FormattedDate.astro';

type Props = {
	note: CollectionEntry<'notes'>;
};

const { note } = Astro.props;
const { title, description, pubDate, tags } = note.data;
---

<article class="note-card">
	<a href={`/notes/${note.id}/`} class="card-link">
		<h3 class="title">{title}</h3>
	</a>
	<p class="date"><FormattedDate date={pubDate} /></p>
	<p class="desc">{description}</p>
	<div class="tags">
		{tags.map((tag) => (
			<a href={`/notes?tag=${encodeURIComponent(tag)}`} class="tag">{tag}</a>
		))}
	</div>
</article>

<style>
	.note-card {
		padding: 1.5rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(var(--black), 8%);
		transition: box-shadow 0.2s;
	}
	.note-card:hover {
		box-shadow: 0 4px 12px rgba(var(--black), 12%);
	}
	.card-link {
		text-decoration: none;
	}
	.title {
		margin: 0;
		font-size: 1.25em;
		color: rgb(var(--black));
	}
	.card-link:hover .title {
		color: var(--accent);
	}
	.date {
		margin: 0.25rem 0 0.5rem;
		font-size: 0.85em;
		color: rgb(var(--gray));
	}
	.desc {
		margin: 0 0 0.75rem;
		font-size: 0.9em;
		color: rgb(var(--gray-dark));
		line-height: 1.5;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
	.tag {
		display: inline-block;
		padding: 0.15em 0.6em;
		font-size: 0.75em;
		background: rgb(var(--gray-light));
		color: rgb(var(--gray-dark));
		border-radius: 999px;
		text-decoration: none;
		transition: background 0.2s, color 0.2s;
	}
	.tag:hover {
		background: var(--accent);
		color: white;
	}
</style>
```

- [ ] **Step 2: 创建 TagCloud 组件**

```astro
---
interface Props {
	tags: { name: string; count: number }[];
}

const { tags } = Astro.props;
const maxCount = Math.max(...tags.map((t) => t.count), 1);
---

<div class="tag-cloud">
	{tags.map((t) => {
		const size = 0.8 + (t.count / maxCount) * 1.4;
		return (
			<a
				href={`/notes?tag=${encodeURIComponent(t.name)}`}
				class="tag-cloud-item"
				style={`font-size: ${size.toFixed(2)}em`}
			>
				{t.name}
				<span class="count">{t.count}</span>
			</a>
		);
	})}
</div>

<style>
	.tag-cloud {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem 1.25rem;
		padding: 1.5rem 0;
	}
	.tag-cloud-item {
		color: var(--accent);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s;
	}
	.tag-cloud-item:hover {
		color: var(--accent-dark);
	}
	.count {
		font-size: 0.6em;
		vertical-align: super;
		margin-left: 2px;
		color: rgb(var(--gray));
	}
</style>
```

- [ ] **Step 3: 创建 TOC 组件（悬浮目录）**

```astro
---
interface Props {
	headings: { depth: number; slug: string; text: string }[];
}

const { headings } = Astro.props;
---

{
	headings.length > 1 && (
		<nav class="toc" aria-labelledby="toc-title">
			<h2 id="toc-title" class="toc-title">目录</h2>
			<ul>
				{headings.map((h) => (
					<li class={`toc-depth-${h.depth}`}>
						<a href={`#${h.slug}`}>{h.text}</a>
					</li>
				))}
			</ul>
		</nav>
	)
}

<style>
	.toc {
		position: sticky;
		top: 1rem;
		padding: 1rem 1.25rem;
		background: white;
		border-left: 3px solid var(--accent);
		border-radius: 0 8px 8px 0;
		font-size: 0.85em;
		margin-bottom: 2rem;
	}
	.toc-title {
		font-size: 0.85em;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 0.75rem;
		color: rgb(var(--gray));
	}
	.toc ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.toc li {
		margin-bottom: 0.3rem;
		line-height: 1.4;
	}
	.toc-depth-2 { padding-left: 0; }
	.toc-depth-3 { padding-left: 1em; }
	.toc-depth-4 { padding-left: 2em; }
	.toc a {
		color: rgb(var(--gray));
		text-decoration: none;
	}
	.toc a:hover {
		color: var(--accent);
	}
</style>
```

- [ ] **Step 4: 验证构建**

Run: `npx astro build`
Expected: 构建成功（组件未被引用也可以）

- [ ] **Step 5: 提交**

```bash
git add src/components/NoteCard.astro src/components/TagCloud.astro src/components/TOC.astro
git commit -m "feat: add NoteCard, TagCloud, and TOC components"
```

---

### Task 7: 创建 NotePost 布局

**Files:**
- Create: `src/layouts/NotePost.astro`

- [ ] **Step 1: 创建笔记详情布局**

```astro
---
import type { CollectionEntry } from 'astro:content';
import BaseHead from '../components/BaseHead.astro';
import Footer from '../components/Footer.astro';
import FormattedDate from '../components/FormattedDate.astro';
import Header from '../components/Header.astro';
import TOC from '../components/TOC.astro';

type Props = CollectionEntry<'notes'>['data'] & {
	headings: { depth: number; slug: string; text: string }[];
};

const { title, description, pubDate, tags, headings } = Astro.props;
---

<html lang="zh-CN">
	<head>
		<BaseHead title={title} description={description} />
		<style>
			.note-layout {
				display: grid;
				grid-template-columns: minmax(0, 1fr) 220px;
				gap: 2rem;
				align-items: start;
				width: 1080px;
				max-width: calc(100% - 2em);
				margin: auto;
				padding: 3em 1em;
			}
			.prose {
				min-width: 0;
			}
			.note-header {
				margin-bottom: 2rem;
				padding-bottom: 1rem;
				border-bottom: 1px solid rgb(var(--gray-light));
			}
			.note-header h1 {
				margin: 0 0 0.5rem;
			}
			.note-meta {
				font-size: 0.9em;
				color: rgb(var(--gray));
				margin-bottom: 0.75rem;
			}
			.note-tags {
				display: flex;
				flex-wrap: wrap;
				gap: 0.4rem;
				margin-bottom: 1rem;
			}
			.note-tags a {
				padding: 0.15em 0.6em;
				font-size: 0.8em;
				background: rgb(var(--gray-light));
				color: rgb(var(--gray-dark));
				border-radius: 999px;
				text-decoration: none;
			}
			.note-tags a:hover {
				background: var(--accent);
				color: white;
			}
			.toc-sidebar {
				position: sticky;
				top: 1rem;
			}
			@media (max-width: 860px) {
				.note-layout {
					grid-template-columns: 1fr;
				}
				.toc-sidebar {
					display: none;
				}
			}
		</style>
	</head>

	<body>
		<Header />
		<article class="note-layout">
			<div class="prose">
				<header class="note-header">
					<h1>{title}</h1>
					<p class="note-meta"><FormattedDate date={pubDate} /></p>
					<div class="note-tags">
						{tags.map((tag) => (
							<a href={`/notes?tag=${encodeURIComponent(tag)}`}>{tag}</a>
						))}
					</div>
				</header>
				<div class="note-content">
					<slot />
				</div>
			</div>
			<aside class="toc-sidebar">
				<TOC headings={headings} />
			</aside>
		</article>
		<Footer />
	</body>
</html>
```

- [ ] **Step 2: 验证构建**

Run: `npx astro build`
Expected: 构建成功

- [ ] **Step 3: 提交**

```bash
git add src/layouts/NotePost.astro
git commit -m "feat: add NotePost layout with sidebar TOC"
```

---

### Task 8: 实现笔记详情页 `/notes/[slug]`

**Files:**
- Create: `src/pages/notes/[...slug].astro`

- [ ] **Step 1: 创建动态路由页面**

```astro
---
import { type CollectionEntry, getCollection, render } from 'astro:content';
import NotePost from '../../layouts/NotePost.astro';

export async function getStaticPaths() {
	const notes = await getCollection('notes');
	return notes.map((note) => ({
		params: { slug: note.id },
		props: note,
	}));
}

type Props = CollectionEntry<'notes'>;

const note = Astro.props;
const { Content } = await render(note);

// 从渲染后的 Content 中提取标题结构
// 从原始 Markdown body 解析标题（在渲染前获取）
const headings = (note.body || '').split('\n')
	.filter((line) => /^#{1,4}\s/.test(line))
	.map((line) => {
		const match = line.match(/^(#{1,4})\s+(.+)/);
		if (!match) return null;
		return {
			depth: match[1].length,
			slug: match[2]
				.toLowerCase()
				.replace(/[^\w一-鿿\s-]/g, '')
				.replace(/\s+/g, '-'),
			text: match[2],
		};
	})
	.filter(Boolean) as { depth: number; slug: string; text: string }[];
---

<NotePost {...note.data} headings={headings}>
	<Content />
</NotePost>
```

- [ ] **Step 2: 验证构建和路由**

Run: `npx astro build`
Expected: 构建成功，`dist/notes/` 下生成每个笔记的 HTML 文件

- [ ] **Step 3: 提交**

```bash
git add src/pages/notes/\[...slug\].astro
git commit -m "feat: add notes detail page with dynamic routing"
```

---

### Task 9: 实现笔记列表页 `/notes`

**Files:**
- Create: `src/pages/notes/index.astro`

- [ ] **Step 1: 创建笔记列表页（含标签筛选）**

```astro
---
import { getCollection } from 'astro:content';
import BaseHead from '../../components/BaseHead.astro';
import Footer from '../../components/Footer.astro';
import Header from '../../components/Header.astro';
import NoteCard from '../../components/NoteCard.astro';
import TagCloud from '../../components/TagCloud.astro';
import { SITE_TITLE } from '../../consts';

const allNotes = (await getCollection('notes')).sort(
	(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
);

// 收集所有标签及计数
const tagMap = new Map<string, number>();
for (const note of allNotes) {
	for (const tag of note.data.tags) {
		tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
	}
}
const allTags = [...tagMap.entries()]
	.map(([name, count]) => ({ name, count }))
	.sort((a, b) => b.count - a.count);

// URL 参数筛选（客户端实现，服务端预渲染全量数据）
const pageTitle = '笔记';
const pageDescription = `${allNotes.length} 篇笔记，${allTags.length} 个标签`;
---

<!doctype html>
<html lang="zh-CN">
	<head>
		<BaseHead title={`${pageTitle} | ${SITE_TITLE}`} description={pageDescription} />
		<style>
			.notes-page {
				width: 960px;
				max-width: calc(100% - 2em);
				margin: auto;
				padding: 3em 1em;
			}
			.notes-header {
				margin-bottom: 2rem;
				text-align: center;
			}
			.notes-header h1 {
				margin-bottom: 0.25rem;
			}
			.notes-header p {
				color: rgb(var(--gray));
				font-size: 1.1em;
			}
			.tag-filters {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				gap: 0.5rem;
				margin-bottom: 2.5rem;
			}
			.tag-filter-btn {
				padding: 0.3em 0.9em;
				font-size: 0.85em;
				font-family: inherit;
				background: rgb(var(--gray-light));
				color: rgb(var(--gray-dark));
				border: 2px solid transparent;
				border-radius: 999px;
				cursor: pointer;
				transition: all 0.2s;
			}
			.tag-filter-btn:hover {
				border-color: var(--accent);
				color: var(--accent);
			}
			.tag-filter-btn.active {
				background: var(--accent);
				color: white;
				border-color: var(--accent);
			}
			.notes-grid {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
				gap: 1.5rem;
			}
			.no-results {
				grid-column: 1 / -1;
				text-align: center;
				padding: 3rem;
				color: rgb(var(--gray));
			}
		</style>
	</head>
	<body>
		<Header />
		<main class="notes-page">
			<header class="notes-header">
				<h1>📝 笔记</h1>
				<p>{pageDescription}</p>
			</header>

			<div class="tag-filters" id="tag-filters">
				<button class="tag-filter-btn active" data-tag="">全部</button>
				{allTags.map((t) => (
					<button class="tag-filter-btn" data-tag={t.name}>
						{t.name} ({t.count})
					</button>
				))}
			</div>

			<div class="notes-grid" id="notes-grid">
				{allNotes.map((note) => (
					<div class="note-item" data-tags={JSON.stringify(note.data.tags)}>
						<NoteCard note={note} />
					</div>
				))}
			</div>
		</main>
		<Footer />

		<script>
			const filterBtns = document.querySelectorAll('.tag-filter-btn');
			const noteItems = document.querySelectorAll('.note-item');

			// 读取 URL 初始 tag
			const params = new URLSearchParams(window.location.search);
			const activeTag = params.get('tag') || '';

			function filterNotes(tag: string) {
				noteItems.forEach((item) => {
					const el = item as HTMLElement;
					const tags = JSON.parse(el.dataset.tags || '[]');
					el.style.display = !tag || tags.includes(tag) ? '' : 'none';
				});
				filterBtns.forEach((btn) => {
					btn.classList.toggle('active', btn.getAttribute('data-tag') === tag);
				});
				// 更新 URL 不刷新
				const url = new URL(window.location.href);
				if (tag) {
					url.searchParams.set('tag', tag);
				} else {
					url.searchParams.delete('tag');
				}
				window.history.replaceState({}, '', url.toString());
			}

			// 初始筛选
			filterNotes(activeTag);

			// 按钮点击
			filterBtns.forEach((btn) => {
				btn.addEventListener('click', () => {
					filterNotes(btn.getAttribute('data-tag') || '');
				});
			});
		</script>
	</body>
</html>
```

- [ ] **Step 2: 验证构建**

Run: `npx astro build`
Expected: 构建成功，`dist/notes/index.html` 生成

- [ ] **Step 3: 提交**

```bash
git add src/pages/notes/index.astro
git commit -m "feat: add notes list page with tag filtering"
```

---

### Task 10: 实现标签总览页 `/tags`

**Files:**
- Create: `src/pages/tags/index.astro`

- [ ] **Step 1: 创建标签页**

```astro
---
import { getCollection } from 'astro:content';
import BaseHead from '../../components/BaseHead.astro';
import Footer from '../../components/Footer.astro';
import Header from '../../components/Header.astro';
import TagCloud from '../../components/TagCloud.astro';
import { SITE_TITLE } from '../../consts';

const allNotes = await getCollection('notes');

const tagMap = new Map<string, { count: number; notes: { title: string; slug: string }[] }>();
for (const note of allNotes) {
	for (const tag of note.data.tags) {
		if (!tagMap.has(tag)) {
			tagMap.set(tag, { count: 0, notes: [] });
		}
		const entry = tagMap.get(tag)!;
		entry.count++;
		entry.notes.push({ title: note.data.title, slug: note.id });
	}
}

const allTags = [...tagMap.entries()]
	.map(([name, data]) => ({ name, ...data }))
	.sort((a, b) => b.count - a.count);
---

<!doctype html>
<html lang="zh-CN">
	<head>
		<BaseHead title={`标签 | ${SITE_TITLE}`} description="按标签浏览所有笔记" />
		<style>
			.tags-page {
				width: 960px;
				max-width: calc(100% - 2em);
				margin: auto;
				padding: 3em 1em;
			}
			.tags-header {
				text-align: center;
				margin-bottom: 2rem;
			}
			.tags-header h1 {
				margin-bottom: 0.25rem;
			}
			.tag-section {
				margin-bottom: 3rem;
			}
			.tag-section h2 {
				font-size: 1.4em;
				margin-bottom: 0.5rem;
			}
			.tag-section h2 a {
				text-decoration: none;
			}
			.tag-notes {
				display: flex;
				flex-wrap: wrap;
				gap: 0.3rem 1rem;
				list-style: none;
				padding: 0;
				margin: 0;
			}
			.tag-notes li::before {
				content: "·";
				margin-right: 0.5rem;
				color: var(--accent);
			}
			.tag-notes a {
				font-size: 0.95em;
				color: rgb(var(--gray-dark));
				text-decoration: none;
			}
			.tag-notes a:hover {
				color: var(--accent);
			}
		</style>
	</head>
	<body>
		<Header />
		<main class="tags-page">
			<header class="tags-header">
				<h1>🏷️ 标签</h1>
				<p>共 {allTags.length} 个标签，{allNotes.length} 篇笔记</p>
			</header>
			<section class="tag-cloud-section" style="margin-bottom: 2rem;">
				<TagCloud tags={allTags.map(t => ({ name: t.name, count: t.count }))} />
			</section>
			<hr style="margin-bottom: 2rem;" />
			{allTags.map((tag) => (
				<section class="tag-section">
					<h2>
						<a href={`/notes?tag=${encodeURIComponent(tag.name)}`}>
							{tag.name} <span style="font-size:0.7em;color:rgb(var(--gray))">({tag.count})</span>
						</a>
					</h2>
					<ul class="tag-notes">
						{tag.notes.map((n) => (
							<li><a href={`/notes/${n.slug}/`}>{n.title}</a></li>
						))}
					</ul>
				</section>
			))}
		</main>
		<Footer />
	</body>
</html>
```

- [ ] **Step 2: 验证构建**

Run: `npx astro build`
Expected: 构建成功，`dist/tags/index.html` 生成

- [ ] **Step 3: 提交**

```bash
git add src/pages/tags/index.astro
git commit -m "feat: add tags overview page with tag cloud"
```

---

### Task 11: 改造首页

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: 改造成个人笔记首页**

```astro
---
import { getCollection } from 'astro:content';
import BaseHead from '../components/BaseHead.astro';
import Footer from '../components/Footer.astro';
import Header from '../components/Header.astro';
import FormattedDate from '../components/FormattedDate.astro';
import TagCloud from '../components/TagCloud.astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

const notes = (await getCollection('notes')).sort(
	(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
);

const latestNotes = notes.slice(0, 5);

const tagMap = new Map<string, number>();
for (const note of notes) {
	for (const tag of note.data.tags) {
		tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
	}
}
const allTags = [...tagMap.entries()]
	.map(([name, count]) => ({ name, count }))
	.sort((a, b) => b.count - a.count);
---

<!doctype html>
<html lang="zh-CN">
	<head>
		<BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} />
		<style>
			.home-page {
				width: 960px;
				max-width: calc(100% - 2em);
				margin: auto;
				padding: 3em 1em;
			}
			.hero {
				text-align: center;
				margin-bottom: 3rem;
			}
			.hero h1 {
				margin-bottom: 0.5rem;
			}
			.hero p {
				font-size: 1.15em;
				color: rgb(var(--gray));
				max-width: 600px;
				margin: 0 auto;
			}
			.hero-links {
				margin-top: 1.5rem;
				display: flex;
				justify-content: center;
				gap: 1rem;
			}
			.hero-links a {
				padding: 0.5em 1.5em;
				background: var(--accent);
				color: white;
				border-radius: 8px;
				text-decoration: none;
				font-weight: 500;
				transition: background 0.2s;
			}
			.hero-links a:hover {
				background: var(--accent-dark);
			}
			.hero-links a.secondary {
				background: rgb(var(--gray-light));
				color: rgb(var(--gray-dark));
			}
			.hero-links a.secondary:hover {
				background: rgb(var(--gray));
				color: white;
			}
			.section-title {
				text-align: center;
				margin: 2rem 0 1.5rem;
			}
			.section-title h2 {
				font-size: 1.6em;
				margin-bottom: 0.25rem;
			}
			.section-title a {
				font-size: 0.9em;
				color: var(--accent);
				text-decoration: none;
			}
			.latest-list {
				list-style: none;
				padding: 0;
				max-width: 640px;
				margin: 0 auto;
			}
			.latest-list li {
				padding: 0.75rem 0;
				border-bottom: 1px solid rgb(var(--gray-light));
			}
			.latest-list li:last-child {
				border-bottom: none;
			}
			.latest-list a {
				font-weight: 500;
				color: rgb(var(--black));
				text-decoration: none;
				font-size: 1.05em;
			}
			.latest-list a:hover {
				color: var(--accent);
			}
			.latest-list .meta {
				font-size: 0.8em;
				color: rgb(var(--gray));
				margin-top: 0.15rem;
			}
		</style>
	</head>
	<body>
		<Header />
		<main class="home-page">
			<section class="hero">
				<h1>👋 Lesedi's Notes</h1>
				<p>{SITE_DESCRIPTION}</p>
				<div class="hero-links">
					<a href="/notes">📝 浏览笔记</a>
					<a href="/tags" class="secondary">🏷️ 按标签查看</a>
				</div>
			</section>

			<div class="section-title">
				<h2>热门标签</h2>
			</div>
			<TagCloud tags={allTags.slice(0, 15)} />

			<div class="section-title">
				<h2>最新笔记</h2>
				<a href="/notes">查看全部 →</a>
			</div>
			<ul class="latest-list">
				{latestNotes.map((note) => (
					<li>
						<a href={`/notes/${note.id}/`}>{note.data.title}</a>
						<div class="meta">
							<FormattedDate date={note.data.pubDate} />
							{' · '}
							{note.data.tags.slice(0, 3).join(', ')}
						</div>
					</li>
				))}
			</ul>
		</main>
		<Footer />
	</body>
</html>
```

- [ ] **Step 2: 验证构建**

Run: `npx astro build`
Expected: 构建成功，`dist/index.html` 为新首页

- [ ] **Step 3: 提交**

```bash
git add src/pages/index.astro
git commit -m "feat: redesign homepage for personal notes"
```

---

### Task 12: 更新导航和全局样式

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: 更新 Header 导航链接**

在 `Header.astro` 第 10-12 行，将博客链接替换为笔记链接：

```astro
<div class="internal-links">
	<HeaderLink href="/">Home</HeaderLink>
	<HeaderLink href="/notes">Notes</HeaderLink>
	<HeaderLink href="/tags">Tags</HeaderLink>
	<HeaderLink href="/about">About</HeaderLink>
</div>
```

- [ ] **Step 2: 更新 Footer**

将 `Footer.astro` 第 6 行的 "Your name here" 改为 "Lesedi"，并简化社交链接（可选）。

- [ ] **Step 3: 补充 global.css 中的笔记样式**

在 `src/styles/global.css` 末尾追加：

```css
/* Note content styles */
.note-content h2 {
	margin-top: 2em;
	padding-bottom: 0.3em;
	border-bottom: 1px solid rgb(var(--gray-light));
}
.note-content h3 {
	margin-top: 1.5em;
}
.note-content table {
	border-collapse: collapse;
	margin: 1em 0;
}
.note-content th,
.note-content td {
	padding: 0.5em 0.75em;
	border: 1px solid rgb(var(--gray-light));
	text-align: left;
}
.note-content th {
	background: rgb(var(--gray-light));
	font-weight: 600;
}
```

- [ ] **Step 4: 验证构建**

Run: `npm run build`
Expected: 构建成功，无错误

- [ ] **Step 5: 提交**

```bash
git add src/components/Header.astro src/components/Footer.astro src/styles/global.css
git commit -m "feat: update navigation and styles for notes site"
```

---

### Task 13: 最终验证

**Files:** 无

- [ ] **Step 1: 完整构建**

Run: `npm run build`
Expected: 构建成功，所有页面生成到 `dist/`

- [ ] **Step 2: 运行开发服务器验证**

```bash
npm run dev
```

访问以下页面，确认功能正常：
- `http://localhost:4321/` — 首页展示正常
- `http://localhost:4321/notes` — 笔记列表，标签筛选正常
- `http://localhost:4321/notes/javascript-basics/` — 笔记详情，TOC 目录正常
- `http://localhost:4321/tags` — 标签云和标签列表正常

- [ ] **Step 3: 提交（如有修正）**

```bash
git add -A
git commit -m "fix: final adjustments and verification"
```
