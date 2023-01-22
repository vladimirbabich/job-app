const creationDate = new Date();
const data = {
  skills: [
    { name: 'repair electronics' },
    { name: 'repair car' },
    { name: 'house work' },
    { name: 'house cleaning' },
    { name: 'house building' },
    { name: 'teacher' },
  ],
  users: [
    {
      name: 'John',
      email: 'john@gmail.com',
      phone: '805939427832',
      pass: '1234576',
      createdAt: creationDate,
      updatedAt: creationDate,
      about: 'Lorefohofh sf hosdf hosfhj eio iwio fjiwe',
    },
    {
      name: 'Frank',
      email: 'frank@gmail.com',
      phone: '93792939123',
      pass: 'passsw',
      createdAt: creationDate,
      updatedAt: creationDate,
      about: 'Lorefohofh sf hosdf hosfhj eiosadop asjdo japsd jasdja spd jaspd asopd jaso dpjaso dopasdj oaps djasp djopa sjdasopd jaospd japso jdopsa jdopas jdpoa sjdop sajd o sadjpjasopd jasopdj opsajdopas japsojdopas joapsjd paosdk p[qwjf[ afjofj a[ jopawefj poajf p[aofoj pa sda!]]]] iwio fjiwe',
    },
    {
      name: 'Anna',
      email: 'anna@gmail.com',
      phone: '98787911111',
      pass: 'gdfgdg',
      createdAt: creationDate,
      updatedAt: creationDate,
      about: '12345',
    },
    {
      name: 'Ingrid',
      email: 'ingrid@gmail.com',
      phone: '12345678901',
      pass: 'weakpass',
      createdAt: creationDate,
      updatedAt: creationDate,
    },
    {
      name: 'Richard',
      email: 'richard@gmail.com',
      phone: '937999999',
      pass: '937999999',
      createdAt: creationDate,
      updatedAt: creationDate,
    },
  ],
  jobs: [
    {
      workAddress: 'street of justice league 12',
      workList: `do that and this:
1) task1
2) task2
3) task3
4) task4
that\`s all, falks`,
      deadline: '2022-12-12',
      price: '12000',
      createdAt: creationDate,
      updatedAt: creationDate,
      userId: 1,
      hiredUserId: 2,
    },
    {
      workAddress: 'oxford area, 51',
      workList: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget felis et nulla dignissim lobortis sed in nisi. Aenean molestie purus sed nisl consequat, eu porttitor eros rhoncus. Nulla facilisi. Phasellus in fringilla nisl. Nulla vitae felis pharetra, placerat dolor nec, blandit augue. Duis id massa aliquet, vulputate quam eu, ultrices ex. Sed rhoncus in lacus sed tincidunt. Fusce semper dui eget sapien sollicitudin, ut venenatis turpis ornare. Sed aliquet hendrerit magna, vel malesuada magna luctus eu. Vestibulum congue rhoncus enim, in placerat ante ornare luctus. Pellentesque semper justo sed ultrices ullamcorper. Vivamus eu tellus augue.

            Ut aliquet lorem ante, sed congue lacus scelerisque vitae. Etiam in tempus diam. Aenean efficitur vulputate mauris, ut ullamcorper nulla semper id. Mauris posuere condimentum nisi, nec sollicitudin diam vehicula in. Fusce accumsan accumsan ultrices. Quisque ullamcorper, dui id pellentesque tempus, lorem leo sodales nisi, a mollis elit urna eu lectus. Suspendisse mollis egestas libero, ac suscipit libero varius in. Vestibulum in magna quis augue lacinia consequat eget euismod tortor. Pellentesque semper sit amet purus nec molestie. In leo sem, sodales vel nunc eu, scelerisque convallis sapien. Duis vel sapien nec quam egestas finibus eu sed lacus. Integer in massa vestibulum, sagittis nisl vitae, tincidunt orci.
            
            Ut et sapien luctus orci bibendum interdum quis dignissim diam. Donec placerat porttitor tincidunt. Nunc pulvinar, lacus nec efficitur feugiat, massa mi lobortis arcu, ut semper massa purus ac ante. Pellentesque dictum vitae odio vitae scelerisque. Suspendisse potenti. Ut at sem ac nibh iaculis suscipit ut nec tortor. Aenean a ullamcorper urna. Proin id turpis sit amet mi commodo ornare.`,
      deadline: '2023-01-30',
      price: '17500',
      createdAt: creationDate,
      updatedAt: creationDate,
      userId: 2,
      status: 'pending',
    },
    {
      workAddress: 'b9 ap315, cicero avenue',
      workList: 'Aliquam aliquet a lectus vitae scelerisque. Vivamus mollis aliquam mi. Ut condimentum ex sed enim ultrices accumsan quis at justo. Ut non varius lectus. Aenean ac nisi urna. Quisque tempor, leo a molestie auctor, urna mi aliquet nulla, id laoreet eros augue ac magna. Nunc gravida ex in felis mattis, a posuere leo interdum. Nullam purus risus, accumsan sit amet porttitor quis, luctus ac augue. Morbi porttitor enim consequat, feugiat mi vel, egestas orci. Integer ut elit imperdiet, malesuada mi ac, convallis libero. Aliquam non nisl eget urna dignissim hendrerit. Maecenas tempor vestibulum velit ut scelerisque.',
      deadline: '2023-02-02',
      price: '15000',
      createdAt: creationDate,
      updatedAt: creationDate,
      userId: 1,
      hiredUserId: 3,
      status: 'done',
    },
    {
      workAddress: 'blicker st. 19',
      workList: 'do this and that and blablabla',
      deadline: '2023-04-03',
      price: '25000',
      createdAt: creationDate,
      updatedAt: creationDate,
      userId: 3,
    },
    {
      workAddress: 'b9 ap315, cicero avenue',
      workList: '1/first task 2/second task',
      deadline: '2023-05-17',
      price: '10000',
      createdAt: creationDate,
      updatedAt: creationDate,
      userId: 1,
    },
  ],
  medias: [
    {
      jobId: 3,
      fileName: 'j31.png',
      width: 1080,
      height: 857
    },
    {
      jobId: 3,
      fileName: 'j32.png',
      width: 1080,
      height: 762
    },
    {
      jobId: 3,
      fileName: 'j33.png',
      width: 1080,
      height: 858
    },
    {
      jobId: 3,
      fileName: 'j34.png',
      width: 1080,
      height: 753
    },
    {
      jobId: 3,
      fileName: 'j35.png',
      width: 915,
      height: 672
    },
    {
      jobId: 3,
      fileName: 'j36.png',
      width: 570,
      height: 931
    },
    {
      jobId: 3,
      fileName: 'j37.png',
      width: 1080,
      height: 1191
    },
    {
      jobId: 3,
      fileName: 'j38.png',
      width: 1080,
      height: 1269
    },
    {
      jobId: 3,
      fileName: 'j39.png',
      width: 540,
      height: 731
    },
    {
      jobId: 3,
      fileName: 'j310.png',
      width: 537,
      height: 731
    },
    {
      jobId: 2,
      fileName: 'j21.png',
      width: 1080,
      height: 783
    },
    {
      jobId: 2,
      fileName: 'j22.png',
      width: 1080,
      height: 1080
    },
    {
      jobId: 2,
      fileName: 'j23.png',
      width: 1080,
      height: 930
    },
    {
      jobId: 4,
      fileName: 'j41.png',
      width: 1080,
      height: 1080
    },
    {
      userId: 2,
      fileName: 'Anna.jpg',
      width: 1024,
      height: 1024
    },
    {
      userId: 3,
      fileName: 'John.jpg',
      width: 1024,
      height: 1024
    },
    {
      userId: 4,
      fileName: 'Ingrid.jpg',
      width: 1024,
      height: 1024
    },
  ],
  ratings: [
    { rate: 1, userId: 1, ratedJobId: 2 },
    { rate: 5, userId: 1, ratedJobId: 3 },
    { rate: 3, userId: 2, ratedUserId: 3 },
    { rate: 3, userId: 2, ratedUserId: 1 },
    { rate: 4, userId: 4, ratedUserId: 1 },
  ],
  userSkills: [
    { userId: 1, skillId: 2 },
    { userId: 3, skillId: 3 },
    { userId: 3, skillId: 4 },
    { userId: 2, skillId: 2 },
    { userId: 3, skillId: 2 },
    { userId: 2, skillId: 3 },
    { userId: 2, skillId: 4 },
    { userId: 2, skillId: 5 },
  ],
}

module.exports = data;