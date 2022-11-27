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
testDB();
function testDB() {
  console.log("testDB");
  new Promise(function (resolve, reject) {
    insertInDB(data, 'skills', urlArray[0])
    console.log('done skills')
    resolve()
  }).then(new Promise(function (resolve, reject) {
    insertInDB(data, 'users', urlArray[1])
    console.log('done users')
    resolve();
  })).then(new Promise(function (resolve, reject) {
    insertInDB(data, 'jobs', urlArray[2])
    console.log('done jobs')
    resolve();
  })).then(new Promise(function (resolve, reject) {
    insertInDB(data, 'medias', urlArray[3])
    console.log('done medias')
    resolve();
  })).then(new Promise(function (resolve, reject) {
    insertInDB(data, 'ratings', urlArray[4])
    console.log('done ratings')
    resolve();
  })).then(new Promise(function (resolve, reject) {
    insertInDB(data, 'userSkills', urlArray[5])
    console.log('done userSkills')
    resolve();
  }));
}

function insertInDB(data, array, query) {
  data[array].map(el => {
    if (query.http == 'post') {
      axios.post(query.url, {
        ...el
      })
        .then(function (response) {
          // console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      let url = `${query.url}`;
      let counter = 0;
      for (let prop in el) {
        let separator = counter == 0 ? '?' : '&';
        counter++;
        url += `${separator}${prop}=${el[prop]}`;
      }
      // console.log(url);
      axios.get(url)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  })
}

module.exports = testDB