console.log('asdasd')
const axios = require('axios')
const data = require('./defaultData');

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
        console.log('ok')
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

// const creationDate = new Date();
// // testDB();
// function testDB() {
//   console.log("testDB");

//   let promises = insertInDB(data, urlArray[0])
//   Promise.all(promises)
//     .then(() => {
//       promises = insertInDB(data, urlArray[1]);
//       Promise.all(promises)
//         .then(() => {
//           promises = insertInDB(data, urlArray[2])
//           Promise.all(promises)
//             .then(() => {
//               promises = insertInDB(data, urlArray[3])
//               Promise.all(promises)
//                 .then(() => {
//                   promises = insertInDB(data, urlArray[4])
//                   Promise.all(promises)
//                     .then(() => {
//                       promises = insertInDB(data, urlArray[5])
//                       Promise.all(promises)
//                         .then(() => {
//                           console.log('ok')
//                         })
//                     })
//                 })
//             })
//         })
//     })
// }