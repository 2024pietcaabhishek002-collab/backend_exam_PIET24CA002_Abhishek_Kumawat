// A1: Create a basic HTTP server using Node.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to the Backend Practical Exam!');
});

server.listen(3001, '127.0.0.1', () => {
  console.log('A1 server running at http://127.0.0.1:3001');
  http.get('http://127.0.0.1:3001', (response) => {
    let body = '';
    response.on('data', chunk => body += chunk);
    response.on('end', () => {
      console.log('HTTP Status:', response.statusCode);
      console.log('Response:', body);
      server.close();
    });
  });
});
