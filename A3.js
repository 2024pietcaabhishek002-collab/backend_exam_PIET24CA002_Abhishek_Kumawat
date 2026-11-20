// A3: Write, read and append data to a file using Node.js File System module
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'student_data.txt');

fs.writeFileSync(filePath, 'Name: Abhishek Kumawat\nCourse: B.Tech CSE\n');
console.log('File created and data written successfully.');

fs.appendFileSync(filePath, 'Registration No: PIET24CA002\n');
console.log('New data appended successfully.');

const content = fs.readFileSync(filePath, 'utf8');
console.log('\nFile Content:\n' + content);
