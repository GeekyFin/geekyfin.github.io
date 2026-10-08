const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('http://127.0.0.1:4318');
 await page.locator('[data-story="cmdb"]').click();
 await page.waitForSelector('dialog[open]');assert.equal(new URL(page.url()).hash,'#cmdb');
 await page.keyboard.press('Escape');await page.waitForSelector('dialog[open]',{state:'hidden'});
 await page.goForward();await page.waitForSelector('dialog[open]');
 await page.locator('.reader-close').click();await page.waitForSelector('dialog[open]',{state:'hidden'});
 await page.waitForFunction(()=>!location.hash);
 for (const slug of ['cmdb','electricity','activity-recommender']) {
  await page.goto('http://127.0.0.1:4318');
  await page.locator(`[data-story="${slug}"]`).click();await page.waitForSelector('dialog[open]');
  const scroll = await page.evaluate(()=>scrollY);
  for (let i=0;i<5;i++) {
   await page.keyboard.press('Tab');
   assert.equal(await page.evaluate(()=>document.querySelector('dialog').contains(document.activeElement)),true);
  }
  await page.keyboard.press('Escape');await page.waitForSelector('dialog[open]',{state:'hidden'});
  assert.equal(await page.evaluate(()=>scrollY),scroll);
  assert.equal(await page.locator(`[data-story="${slug}"]`).evaluate(el=>el===document.activeElement),true);
 }
 await page.goto('http://127.0.0.1:4318');
 for (const href of await page.locator('nav a').evaluateAll(links=>links.map(link=>link.getAttribute('href')))) assert.equal(await page.locator(href).count(),1);
 const assets=await page.locator('img,link[rel="stylesheet"],script[src]').evaluateAll(els=>els.map(el=>el.src || el.href));
 for (const url of assets) assert.equal((await page.request.get(url)).ok(),true,`Missing asset: ${url}`);
 assert.deepEqual(await page.locator('.skill-meter').evaluateAll(els=>els.map(el=>el.getAttribute('aria-valuenow'))),['4','4','2','1']);
 await page.goto('http://127.0.0.1:4318/#electricity');await page.waitForSelector('dialog[open]');
 assert.match(await page.locator('#reader-title').textContent(),/Household Energy Analytics/);
 assert.equal(await page.locator('.reader-body .story-figure').count(),2);
 assert.equal(await page.locator('.reader-body img').evaluateAll(images=>images.every(image=>image.complete && image.naturalWidth>0)),true);
 await page.locator('.reader-close').click();await page.waitForSelector('dialog[open]',{state:'hidden'});
 fs.mkdirSync('.preview',{recursive:true});
 await page.goto('http://127.0.0.1:4318');await page.screenshot({path:'.preview/desktop.png',fullPage:true});
 for (const width of [390,320]) {
  await page.setViewportSize({width,height:844});await page.goto('http://127.0.0.1:4318');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow at ${width}`);
  await page.locator('.menu-toggle').click();await page.locator('#navigation a[href="#work"]').click();
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  await page.locator('[data-story="cmdb"]').click();await page.waitForSelector('dialog[open]');
  assert.equal(await page.evaluate(()=>document.querySelector('dialog').scrollWidth<=document.querySelector('dialog').clientWidth),true);
  await page.keyboard.press('Escape');
 }
 await page.goto('http://127.0.0.1:4318');await page.screenshot({path:'.preview/mobile.png',fullPage:true});
 const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto('http://127.0.0.1:4318');
 await nojs.locator('#cmdb summary').click();assert.equal(await nojs.locator('#cmdb').getAttribute('open'),'');
 assert.deepEqual(errors,[]);console.log('Browser checks passed: desktop, 390/320px, reader, Escape, Back/Forward, direct links, no JavaScript.');
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
