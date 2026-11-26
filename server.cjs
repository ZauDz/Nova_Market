const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const mime = {'.js':'text/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml','.jpg':'image/jpeg','.json':'application/json'};
http.createServer((req,res) => {
  let route;
  try { route = decodeURIComponent(new URL(req.url,'http://localhost').pathname); }
  catch { res.writeHead(400).end(); return; }
  const file = path.resolve(__dirname,'.'+(route==='/' ? '/index.html' : route));
  if (!file.startsWith(__dirname+path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file,(err,data) => {
    if (err) { res.writeHead(404).end(); return; }
    res.writeHead(200,{'Content-Type':mime[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'}).end(data);
  });
}).listen(process.env.PORT || 8100,()=>console.log('Nova Market en http://localhost:8100'));
