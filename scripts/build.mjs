import { readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { loadContent, escapeHtml as e, markdown } from './content.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const items = await loadContent(`${root}/content`);
for (const item of items) {
  if (item.image) await access(`${root}/${item.image}`);
  for (const image of item.gallery || []) await access(`${root}/${image.image}`);
}
const picture = (item, className) => `<img class="${className}" src="${e(item.image)}" alt="${e(item.imageAlt)}" loading="lazy">`;
const projects = items.filter(i => i.kind === 'projects').sort((a,b) => (a.order ?? 99)-(b.order ?? 99));
const posts = items.filter(i => i.kind === 'posts').sort((a,b) => b.date.localeCompare(a.date));
const article = item => `<details class="story" id="${e(item.slug)}"><summary>${e(item.title)}</summary><div class="story-content"><p class="eyebrow">${item.tags.map(e).join(' · ')}</p><h2>${e(item.title)}</h2>${item.date ? `<time datetime="${item.date}">${item.date}</time>` : ''}${item.image ? picture(item, 'story-image') : ''}${markdown(item.body)}${(item.gallery || []).map(img => `<figure class="story-figure"><img class="story-image" src="${e(img.image)}" alt="${e(img.alt)}" loading="lazy"><figcaption>${e(img.caption)}</figcaption></figure>`).join('')}${item.link ? `<a class="button" href="${e(item.link)}" target="_blank" rel="noopener noreferrer">${e(item.linkLabel)} ↗</a>` : ''}</div></details>`;
const cards = projects.map((item,index) => `<article class="project">${item.image ? picture(item, 'project-image') : `<div class="project-art art-${index%2}" aria-hidden="true"><span>${String(index+1).padStart(2,'0')}</span><strong>${index%2 ? 'Consumption → insight' : 'Services → clarity'}</strong><div class="art-bars"><i></i><i></i><i></i><i></i><i></i></div></div>`}<p class="eyebrow">${item.tags.map(e).join(' · ')}</p><h3>${e(item.title)}</h3><p>${e(item.summary)}</p><a class="story-link" href="#${e(item.slug)}" data-story="${e(item.slug)}">Read the project story <span aria-hidden="true">↗</span></a></article>`).join('\n');
const writing = posts.length ? posts.map(item => `<article class="post"><div><time datetime="${item.date}">${item.date}</time><h3><a href="#${e(item.slug)}" data-story="${e(item.slug)}">${e(item.title)} ↗</a></h3><p>${e(item.summary)}</p></div></article>`).join('\n') : '<p class="writing-empty">Occasional notes on ICT services, data and practical experiments. New writing will appear here.</p>';
const template = await readFile(`${root}/src/index.html`, 'utf8');
await writeFile(`${root}/index.html`, template.replace('<!-- PROJECTS -->', cards).replace('<!-- POSTS -->', writing).replace('<!-- STORIES -->', items.map(article).join('\n')));
console.log(`Built index.html: ${projects.length} projects, ${posts.length} articles`);
