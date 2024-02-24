const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database.');
});

const multer = require('multer');
const upload = multer({dest: './upload'})

const cors = require('cors'); 
app.use(cors());

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE idDeleted = 0", // 데이터 가져오는 쿼리문 -> 삭제되지 않은 데이터만 가져오는걸로 바꿈
        (err, rows, fields) => {
            if (err) {
                console.error('Error querying database:', err);
                res.status(500).send('Error querying database');
                return;
            }
            res.send(rows);
        }
    )
})

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?,?,?,?,?, now() ,0)';
    let image = '/image/' + req.file.filename;
    //let image = 'http://localhost:4200/image' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    })
})

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET idDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));
