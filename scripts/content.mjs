import { readdir, readFile } from 'node:fs/promises';
export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function parseContent(text, kind, filename) {
  const match = text.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${filename}: expected JSON front matter between --- lines`);
  const meta = JSON.parse(match[1]);
  for (const field of ['slug','title','summary']) if (typeof meta[field] !== 'string' || !meta[field].trim()) throw new Error(`${filename}: missing ${field}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.slug)) throw new Error(`${filename}: invalid slug`);
  if (!Array.isArray(meta.tags) || !meta.tags.length || meta.tags.some(t => typeof t !== 'string' || !t.trim())) throw new Error(`${filename}: tags required`);
  if (meta.link && (!/^https:\/\//.test(meta.link) || !meta.linkLabel)) throw new Error(`${filename}: HTTPS link and linkLabel required`);
  if (meta.image && (!/^images\/[a-zA-Z0-9_/-]+\.(png|jpg|jpeg|webp)$/i.test(meta.image) || meta.image.includes('..') || !meta.imageAlt)) throw new Error(`${filename}: local image path and imageAlt required`);
  if (meta.gallery && (!Array.isArray(meta.gallery) || meta.gallery.some(img => !/^images\/[a-zA-Z0-9_/-]+\.(png|jpg|jpeg|webp)$/i.test(img.image || '') || img.image.includes('..') || !img.alt || !img.caption))) throw new Error(`${filename}: gallery requires local image, alt and caption`);
  if (kind === 'posts' && (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date || '') || Number.isNaN(Date.parse(meta.date)) || new Date(meta.date).toISOString().slice(0,10) !== meta.date)) throw new Error(`${filename}: valid date required`);
  if (!match[2].trim()) throw new Error(`${filename}: empty body`);
  return {...meta, kind, body: match[2].trim()};
}
export function markdown(body) {
  const inline = text => escapeHtml(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const output = [];
  let lines = [], type = null;
  const flush = () => {
    if (lines.length) output.push(type === 'list'
      ? `<ul>${lines.map(line => `<li>${inline(line)}</li>`).join('')}</ul>`
      : `<p>${inline(lines.join(' '))}</p>`);
    lines = []; type = null;
  };
  for (const line of body.split(/\r?\n/)) {
    if (!line.trim()) { flush(); continue; }
    if (line.startsWith('## ')) { flush(); output.push(`<h3>${escapeHtml(line.slice(3))}</h3>`); continue; }
    const nextType = line.startsWith('- ') ? 'list' : 'paragraph';
    if (type && type !== nextType) flush();
    type = nextType; lines.push(nextType === 'list' ? line.slice(2) : line.trim());
  }
  flush();
  return output.join('\n');
}
export async function loadContent(root) {
  const items = [];
  for (const kind of ['projects','posts']) {
    for (const name of (await readdir(`${root}/${kind}`)).filter(n => n.endsWith('.md'))) {
      const item = parseContent(await readFile(`${root}/${kind}/${name}`, 'utf8'), kind, name);
      if (!item.draft) items.push(item);
    }
  }
  const slugs = new Set();
  for (const item of items) { if (slugs.has(item.slug)) throw new Error(`Duplicate slug: ${item.slug}`); slugs.add(item.slug); }
  return items;
}
