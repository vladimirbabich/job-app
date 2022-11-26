const axios = require('axios')
const data = require('./defaultData');

const urlArray = [
  {
    http: 'post',
    url: 'http://localhost:7000/api/user/registration'
  },
  {
    http: 'post',
    url: 'http://localhost:7000/api/rating'
  },
  {
    http: 'post',
    url: 'http://localhost:7000/api/job/'
  },
  {
    http: 'get',
    url: 'http://localhost:7000/api/media/lazy'
  },
]
const creationDate = new Date();
let query = {
  http: 'post',
  url: 'http://localhost:7000/api/job/'
}
// urlArray.map(query => {
// console.dir(data.medias);

// })

//drop all tables
// await sequelize.drop();
// console.log("All tables dropped!");

new Promise(function (resolve, reject) {
  resolve(insertInDB(data, 'users', urlArray[0]))
}).then(new Promise(function (resolve, reject) {
  resolve(insertInDB(data, 'jobs', urlArray[2]));
})).then(new Promise(function (resolve, reject) {
  resolve(insertInDB(data, 'ratings', urlArray[1]));
})).then(new Promise(function (resolve, reject) {
  resolve(insertInDB(data, 'medias', urlArray[3]));
}));
function insertInDB(data, array, query) {
  data[array].map(el => {
    if (query.http == 'post') {
      axios.post(query.url, {
        ...el
      })
        .then(function (response) {
          console.log(response.data);
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
