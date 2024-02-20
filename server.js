const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors'); 
app.use(cors());

// 서버 테스트용 api
// app.get('/api/hello', (req, res) => {  
//     res.send({ message: 'Hello Express!' });
// });

app.get('/api/customers', (req, res) => {
    setTimeout(()=>{
        res.send([
            {
              'id': '1',
              'image': 'https://placeimg.com/64/64/1',
              'name': '배켜니',
              'birthday': '961122',
              'gender': '남자',
              'job': '대학생'
            },
            {
              'id': '2',
              'image': 'https://placeimg.com/64/64/2',
              'name': '소희',
              'birthday': '961122',
              'gender': '남자',
              'job': '대학생'
            },
            {
              'id': '3',
              'image': 'https://placeimg.com/64/64/3',
              'name': '은석이',
              'birthday': '961122',
              'gender': '남자',
              'job': '대학생'
            }
          ])
    }, 5000);
    
})

app.listen(port, () => console.log(`Listening on port ${port}`));
