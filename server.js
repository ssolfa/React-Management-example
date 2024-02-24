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

const cors = require('cors'); 
app.use(cors());

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER", // 데이터 가져오는 쿼리문
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

app.listen(port, () => console.log(`Listening on port ${port}`));
