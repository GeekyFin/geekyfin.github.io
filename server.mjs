import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = process.cwd();
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.JPG':'image/jpeg','.jpg':'image/jpeg','.svg':'image/svg+xml'};
http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const path = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!path.startsWith(root + sep)) {res.writeHead(403).end();return;}
    const data = await readFile(path);res.writeHead(200, {'Content-Type':types[extname(path)] || 'application/octet-stream'});res.end(data);
  } catch {res.writeHead(404).end('Not found');}
}).listen(Number(process.env.PORT || 4317),'127.0.0.1',function(){console.log(`Preview: http://127.0.0.1:${this.address().port}`);});
