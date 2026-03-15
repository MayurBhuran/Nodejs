const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req,res) =>{
 const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
 console.log(filePath);
 


const extName = String(path.extname
  (filePath)).toLowerCase();

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
}

const contentType = mimeTypes[extName] ||
 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {  
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404:file not found brooooooo');
      }
     } else {
        res.writeHead(200,{"content-type":contentType});
        res.end(content,'utf-8');
      } 
    
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});