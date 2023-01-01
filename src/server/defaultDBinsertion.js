console.log('asdasd')
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
  // console.log(urlArray)
  insertAndWaitDBInsertion()
}

function insertTable(dataForDB, { tableName, method, url }) {
  let promises = [];

  dataForDB[tableName].map(el => {

    if (method == 'post') {
      promises.push(axios.post(url, {
        ...el
      }))
    } else {
      let fullUrl = `${url}`;
      let isFirstKey = true;
      for (let prop in el) {
        let separator = isFirstKey ? '?' : '&';
        isFirstKey = false;
        fullUrl += `${separator}${prop}=${el[prop]}`;
      }
      // console.log(url);
      promises.push(axios.get(fullUrl));
    }
  })
  return promises;
}

module.exports = testDB;