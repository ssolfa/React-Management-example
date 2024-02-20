import React from 'react';
import Customer from './Components/Customer';

const customers = [
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
]

function App() {
  return (
    <div>
      {
        customers.map(c => {
          return(
          <Customer
            key={c.id}
            id={c.id}
            image={c.image}
            name={c.name}
            birthday={c.birthday}
            gender={c.gender}
            job={c.job}
          />
          )
        })
      }
    </div>
  );
}

export default App;
