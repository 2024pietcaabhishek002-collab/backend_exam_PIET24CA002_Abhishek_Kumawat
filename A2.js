// A2: Create a simple REST API for student records using Node.js
const http = require('http');

let students = [{ id: 1, name: 'Aman', course: 'B.Tech' }];
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET' && req.url === '/students') {
    res.writeHead(200);
    return res.end(JSON.stringify(students));
  }
  if (req.method === 'POST' && req.url === '/students') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const student = JSON.parse(body);
      student.id = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
      students.push(student);
      res.writeHead(201);
      res.end(JSON.stringify({ message: 'Student added', student }));
    });
    return;
  }
  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Route not found' }));
});

server.listen(3002, '127.0.0.1', () => {
  console.log('A2 REST API running at http://127.0.0.1:3002');
  const data = JSON.stringify({ name: 'Abhishek', course: 'CSE' });
  const request = http.request({ hostname: '127.0.0.1', port: 3002, path: '/students', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } }, response => {
    let body = '';
    response.on('data', chunk => body += chunk);
    response.on('end', () => {
      console.log('POST Status:', response.statusCode);
      console.log('POST Response:', body);
      http.get('http://127.0.0.1:3002/students', getResponse => {
        let list = '';
        getResponse.on('data', chunk => list += chunk);
        getResponse.on('end', () => {
          console.log('GET Status:', getResponse.statusCode);
          console.log('Students:', list);
          server.close();
        });
      });
    });
  });
  request.write(data);
  request.end();
});
