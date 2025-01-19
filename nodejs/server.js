const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const { BookController } = require('./controllers/BookController');
const { UserController } = require('./controllers/UserController');

//
// user 
//
app.post('/api/user/signin', UserController.signin); // เข้าสู่ระบบ
app.get('/api/user/info', UserController.info); // ดึงข้อมูลผู้ใช้

//
// book 
//
app.post('/api/sale/save', BookController.save); // สร้างรายการสั่งซื้อ
app.get('/api/sale/list', BookController.orderList); // แสดงรายการสั่งซื้อ
app.delete('/api/sale/delete/:id', BookController.deleteOrderItem); // ลบรายการออกจากรายการสั่งซื้อ
app.put('/api/sale/confirmOrder', BookController.confirmOrder); // ยืนยันการสั่งซื้อ

app.get('/api/book', BookController.list);
app.post('/api/book', BookController.create);
app.put('/api/book/:id', BookController.update);
app.delete('/api/book/:id', BookController.delete);


app.get('/', (req, res) => {
    res.send('Hello Express Server');
});
app.get('/hello', (req, res) => {
    res.send('Hello');
});

// end point ที่มีพารามิเตอร์
app.get('/hello/:name', (req, res) => {
    const name = req.params.name;
    res.send('Hello ' + name);
});

// end point ที่มีพารามิเตอร์หลายตัว
app.get('/hello/:name/:age', (req, res) => {
    const name = req.params.name;
    const age = req.params.age;
    res.send('Hello ' + name + ' age ' + age);
});

// end point แบบ post
app.post('/customer/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;

    res.send('Customer created ' + name + ' age ' + age);
});

app.put('/customer/update/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;

    res.send('Customer updated ' + id + ' name ' + name + ' age ' + age);
});

app.delete('/customer/delete/:id', (req, res) => {
    const id = req.params.id;
    res.send('Customer deleted ' + id);
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});