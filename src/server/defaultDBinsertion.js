console.log('asdasd')
const axios = require('axios')
const data = require('./defaultData');
const urlArray = [
  {
    http: 'post',
    url: 'http://localhost:7000/api/skill'
  },
  {
    http: 'post',
    url: 'http://localhost:7000/api/user/registration'
  },
  {
    http: 'post',
    url: 'http://localhost:7000/api/job/'
  },
  {
    http: 'get',
    url: 'http://localhost:7000/api/media/lazy'
  },
  {
    http: 'post',
    url: 'http://localhost:7000/api/rating'
  },
  {
    http: 'post',
    url: 'http://localhost:7000/api/userskill'
  },
]
const creationDate = new Date();
// testDB();
function testDB() {
  console.log("testDB");

  let promises = insertInDB(data, 'skills', urlArray[0])
  Promise.all(promises)
    .then(() => {
      promises = insertInDB(data, 'users', urlArray[1]);
      Promise.all(promises)
        .then(() => {
          promises = insertInDB(data, 'jobs', urlArray[2])
          Promise.all(promises)
            .then(() => {
              promises = insertInDB(data, 'medias', urlArray[3])
              Promise.all(promises)
                .then(() => {
                  promises = insertInDB(data, 'ratings', urlArray[4])
                  Promise.all(promises)
                    .then(() => {
                      promises = insertInDB(data, 'userSkills', urlArray[5])
                      Promise.all(promises)
                        .then(() => {
                          console.log('ok')
                        })
                    })
                })
            })
        })
    })
}
// return new Promise(function (resolve, reject) {
//   insertInDB(data, 'skills', urlArray[0])
//   console.log('test skills');
//   resolve(1);
// }).then((result) => {
//   console.log('done skills');
//   return new Promise(function (resolve, reject) {
//     insertInDB(data, 'users', urlArray[1])
//     console.log('test users');
//     resolve(1);
//   }).then((result) => {
//     console.log('done users');
//     return new Promise(function (resolve, reject) {
//       insertInDB(data, 'jobs', urlArray[2])
//       console.log('test jobs');
//     }).then(() => {
//       console.log('done jobs');
//       return new Promise(function (resolve, reject) {
//         // insertInDB(data, 'medias', urlArray[3])
//       }).then(() => {
//         console.log('done medias');
//       return new Promise(function (resolve, reject) {
//         insertInDB(data, 'ratings', urlArray[4])
//       }).then(() => {
//         console.log('done ratings');
//         return new Promise(function (resolve, reject) {
//           insertInDB(data, 'userSkills', urlArray[5])
//         }).then(() => {
//           console.log('done userSkills');
//         })
//       })
// }).catch ((e) => console.log('hi'))
//       }).catch ((e) => console.log('hi'))
//     }).catch ((e) => console.log('hi'))
//   }).catch ((e) => console.log('hi'))
// }

function insertInDB(data, array, query) {
  let promises = [];
  data[array].map(el => {
    if (query.http == 'post') {
      promises.push(axios.post(query.url, {
        ...el
      }))
    } else {
      let url = `${query.url}`;
      let counter = 0;
      for (let prop in el) {
        let separator = counter == 0 ? '?' : '&';
        counter++;
        url += `${separator}${prop}=${el[prop]}`;
      }
      // console.log(url);
      promises.push(axios.get(url));
    }
  })
  return promises;
}

module.exports = testDB;

