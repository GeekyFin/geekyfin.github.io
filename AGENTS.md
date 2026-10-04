# GeekyFin maintenance

- Follow the approved Nordic Professional design: deep blue, warm light background, serif headings, spacious editorial layout. Main identity is Mikko Sortti; GeekyFin is secondary.
- Primary audience: Finnish recruiters, including English-speaking workplaces. Write clear English with concrete examples. Do not invent results, roles, hobbies, qualifications or articles.
- Keep the principal site one scrolling page. Projects and articles open in the shared reader overlay with blur, keyboard support, URL history and scroll/focus restoration.
- Add content via `content/projects` or `content/posts`; use the metadata and structure documented in README.md. Do not introduce per-item inline styling or a new card/reader design.
- Keep empty blog state until a real article is authorised. Drafts must not appear publicly.
- Modify `src/index.html`, then run `npm run build`; do not hand-edit generated `index.html`.
- Run `npm test`, check the build, and verify mobile/desktop plus reader interactions after functional changes.
- No database or runtime service is required. Keep GitHub Pages compatibility, relative asset URLs and minimal dependencies.
- Do not deploy, push or merge until requested. Mention any unverified biography details before release.
