const dialog = document.querySelector('.reader');
const readerBody = dialog.querySelector('.reader-body');
const closeButton = dialog.querySelector('.reader-close');
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
let trigger = null;
let pushed = false;

function openStory(slug, source, updateHistory = false) {
  const story = document.getElementById(slug);
  if (!story?.classList.contains('story')) return false;
  trigger = source || document.querySelector(`[data-story="${slug}"]`);
  readerBody.replaceChildren(story.querySelector('.story-content').cloneNode(true));
  readerBody.querySelector('h2').id = 'reader-title';
  if (updateHistory) {
    history.pushState({story:slug}, '', `#${slug}`);
    pushed = true;
  }
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('reading');
  dialog.scrollTop = 0;
  closeButton.focus();
  return true;
}
function clearReader() {
  if (dialog.open) dialog.close();
  document.body.classList.remove('reading');
  trigger?.focus({preventScroll:true});
}
function closeStory() {
  clearReader();
  if (pushed) {pushed = false; history.back();}
  else if (document.getElementById(location.hash.slice(1))?.classList.contains('story')) history.replaceState(null, '', location.pathname + location.search);
}
if (typeof dialog.showModal === 'function') {
  document.body.classList.add('enhanced');
  menuButton.hidden = false;
  document.querySelectorAll('[data-story]').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();openStory(link.dataset.story,link,true);
  }));
  closeButton.addEventListener('click',closeStory);
  dialog.addEventListener('cancel', event => {event.preventDefault();closeStory();});
  dialog.addEventListener('click',event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeStory();
  });
  const syncLocation = () => {
    if (!openStory(location.hash.slice(1),null)) {clearReader();pushed=false;}
  };
  window.addEventListener('popstate',syncLocation);
  window.addEventListener('hashchange',syncLocation);
  syncLocation();
}
menuButton.addEventListener('click',() => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);
});
nav.addEventListener('click',event => {
  if (event.target.closest('a')) {menuButton.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}
});
document.addEventListener('keydown',event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {nav.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.focus();}
});
const updateHeader = () => header.classList.toggle('scrolled',window.scrollY > 35);
window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
const sections = document.querySelectorAll('main > section[id]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.find(entry => entry.isIntersecting);
    if (!visible) return;
    nav.querySelectorAll('a').forEach(link => link.hash === `#${visible.target.id}` ? link.setAttribute('aria-current','location') : link.removeAttribute('aria-current'));
  },{rootMargin:'-15% 0px -60% 0px'});
  sections.forEach(section => observer.observe(section));
}
