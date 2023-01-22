const axios = require('axios')
const data = require('./defaultData');
const updateUserUrl = 'http://localhost:7000/api/user/update'

const urlArray = [
  {
    tableName: 'skills',
    method: 'post',
    url: 'http://localhost:7000/api/skill'
  },
  {
    tableName: 'users',
    method: 'post',
    url: 'http://localhost:7000/api/user/registration'
  },
  {
    tableName: 'jobs',
    method: 'post',
    url: 'http://localhost:7000/api/job/'
  },
  {
    tableName: 'medias',
    method: 'get',
    url: 'http://localhost:7000/api/media/lazy'
  },
  {
    tableName: 'ratings',
    method: 'post',
    url: 'http://localhost:7000/api/rating'
  },
  {
    tableName: 'userSkills',
    method: 'post',
    url: 'http://localhost:7000/api/userskill'
  },
]
function insertAndWaitDBInsertion(index) {
  let curIndex = index ? index : 0;
  let promises = insertTable(data, urlArray[curIndex])
  Promise.all(promises)
    .then(() => {
      if (curIndex < urlArray.length - 1) {
        insertAndWaitDBInsertion(++curIndex);
      } else {
        console.log('ok, all types of DB was successfully inserted')
      }
    })
}

function testDB() {
  console.log("testDB");
  insertAndWaitDBInsertion()
}

function insertTable(dataForDB, { tableName, method, url }) {
  let promises = [];

  dataForDB[tableName].map(el => {

    if (method == 'post') {
      promises.push(axios.post(url, {
        ...el
      },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInBob25lIjoiMzQzNDM0MzQzNDM0IiwiaWF0IjoxNjc0MjcyODA5LCJleHAiOjE2NzQzNTkyMDl9.S2pLE_03AkHg6LRs4JGLpPIHKj229ODw_b_u8pMad7k`
          }
        }))
    } else {
      let fullUrl = `${url}`;
      let isFirstKey = true;
      for (let prop in el) {
        let separator = isFirstKey ? '?' : '&';
        isFirstKey = false;
        fullUrl += `${separator}${prop}=${el[prop]}`;
      }
      promises.push(axios.get(fullUrl));
    }
  })
  return promises;
}

module.exports = testDB;