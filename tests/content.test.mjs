import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { loadContent, parseContent, markdown } from '../scripts/content.mjs';
const example = metadata => `---\n${JSON.stringify(metadata)}\n---\n## Question\n\nA practical question.`;
const valid = {slug:'example',title:'Example',summary:'Summary',tags:['Data']};
test('current content is valid and has unique slugs',async()=>{
 const items=await loadContent(fileURLToPath(new URL('../content',import.meta.url)));
 assert.equal(items.filter(i=>i.kind==='projects').length,3);
 assert.equal(new Set(items.map(i=>i.slug)).size,items.length);
});
test('rejects missing metadata and invalid publication dates',()=>{
 assert.throws(()=>parseContent(example({...valid,title:''}),'projects','bad.md'),/missing title/);
 assert.throws(()=>parseContent(example({...valid,date:'2026-02-30'}),'posts','bad.md'),/valid date/);
 assert.throws(()=>parseContent(example({...valid,link:'javascript:alert(1)'}),'projects','bad.md'),/HTTPS/);
});
test('Markdown escapes HTML rather than executing author markup',()=>{
 assert.equal(markdown('## Heading\n\n<script>alert(1)</script>'),'<h3>Heading</h3>\n<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>');
});
test('headings and paragraphs stay separate without a blank line',()=>{
 assert.equal(markdown('## The question:\nA clear question.\nContinued here.\n\n## My contribution:\n- First item\n- Second item'),'<h3>The question:</h3>\n<p>A clear question. Continued here.</p>\n<h3>My contribution:</h3>\n<ul><li>First item</li><li>Second item</li></ul>');
});
