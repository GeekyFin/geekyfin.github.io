# GeekyFin — Mikko Sortti

English-language personal site for a Finnish recruitment audience. Static HTML, CSS and JavaScript; no database, framework or package dependencies. GitHub Pages serves the generated root `index.html`.

## Local development

Requires Node.js 20 or later.

```sh
npm run build
npm test
npm run dev
```

Preview at http://127.0.0.1:4317. Rebuild after changing content or `src/index.html`. Commit the generated `index.html` alongside source changes. Keep the existing Pages publishing branch until the redesign has been reviewed; merging/pushing is a separate release step. The repository’s actual Pages settings must be checked before publishing.

## Content management

Projects live in `content/projects/*.md`; articles in `content/posts/*.md`. Each file starts with JSON metadata between `---` lines. Supported body syntax is deliberately simple: paragraphs, `##` headings, and blocks of `-` list items. HTML is escaped. No invented publication dates or results.

Required fields: `slug`, `title`, `summary`, `tags`. Project `order` controls sorting. Articles require a real `date` in YYYY-MM-DD format and sort newest first. Set `draft: true` to hide an unfinished entry. Optional `link` must use HTTPS and needs `linkLabel`. Slugs are unique across both collections and form shareable URLs such as `/#cmdb`.

Optional `image` points to a local PNG, JPG or WebP under `images/` and requires descriptive `imageAlt`. The same image appears in the project card and reader. Build checks that the file exists. Keep any privacy masking already present in supplied screenshots.

Optional `gallery` is an array of objects with `image`, `alt` and `caption`, using the same local image rules. It appears below the reader text. Keep captions factual and distinguish different datasets or experiments.

Example project:

```text
---
{"slug":"example-project","title":"A useful result","summary":"One concise sentence.","tags":["Python","Analytics"],"order":3,"draft":true}
---
## The question

Explain the problem.

## My contribution

Explain Mikko’s actual role.

## The approach

Explain how the work was done.

## Findings & lessons

Describe verified results and practical limits.
```

For a post, add `date` and use headings appropriate to the topic. Build validates required metadata, dates and unique slugs. Projects currently use abstract decorative graphics, not screenshots or measured results.

## Design and review

Shared design tokens and responsive layouts: `assets/site.css`. Template: `src/index.html`. Reader, URL history and navigation: `assets/site.js`. Content is rendered into the HTML at build time, so it remains readable without JavaScript. With JavaScript, native dialogs handle focus confinement and Escape; closing restores focus and preserves the underlying scroll position.

Check desktop and mobile navigation, project links, direct story URLs, Back/Forward, Escape, keyboard focus, reduced motion and JavaScript-disabled reading before release. Confirm degree translations and current organisation/job names with Mikko before publishing.

Optional browser smoke check: `node scripts/check-browser.cjs` expects Playwright available through Node module resolution, Microsoft Edge installed, and the local preview running on port 4318 (`PORT=4318`). This is a development check, not a site dependency.

The previous HTML5 UP site is retained in Git history. Its original `LICENSE.txt` remains for provenance; the new design does not use the old template code.
