const http = require('http');

// req = request, res = response
// req ไว้รับคำขอจาก client
// res ไว้ส่งคำตอบกลับไปยัง client
const server = http.createServer((req, res) => {
    res.end('Hello World');
});

// กำหนดพอร์ตที่จะรัน server
server.listen(3001, 'localhost', () => {
    console.log('Server is running on port 3001');
});

