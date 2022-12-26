const creationDate = new Date();
const data = {
    skills: [
        { name: 'установка кондиционеров' },
        { name: 'ремонт кондиционеров' },
        { name: 'ремонт авто' },
        { name: 'уборка дома' },
        { name: 'ремонт дома' },
        { name: 'покраска' },
    ],
    users: [
        {
            name: 'Joe',
            email: 'joe@gmail.com',
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
    ],
    jobs: [
        {
            workAddress: 'ulica pushkina',
            workList: 'do that and this',
            deadline: new Date('2022-12-12'),
            price: '10000',
            createdAt: creationDate,
            updatedAt: creationDate,
            userId: 1,
        },
        {
            workAddress: 'korpus 6, pereulok 2',
            workList: 'a,b,c,d tasks',
            deadline: new Date('2023-01-30'),
            price: '17500',
            createdAt: creationDate,
            updatedAt: creationDate,
            userId: 2,
        },
        {
            workAddress: 'ulica kolotushkina',
            workList: 'do that and this etc',
            deadline: new Date('2023-02-02'),
            price: '15000',
            createdAt: creationDate,
            updatedAt: creationDate,
            userId: 1,
        },
    ],
    medias: [
        {
            jobId: 1,
            fileName: 'asfasdasdasdasdfas.png',
            width:10,
            height:20
        },
        {
            jobId: 1,
            fileName: '2134213asdasd123123.png',
            width:10,
            height:20
        },
        {
            jobId: 2,
            fileName: 'asfasdaasdasdsdfas.png',
            width:10,
            height:20
        },
        {
            userId: 2,
            fileName: 'asf22asdaasdasdsdfas.png',
            width:10,
            height:20
        },
    ],
    ratings: [
        { rate: 1, userId: 1, ratedJobId: 2 },
        { rate: 5, userId: 1, ratedJobId: 3 },
        { rate: 1, userId: 1, ratedUserId: 1 },
        { rate: 3, userId: 2, ratedUserId: 3 },
        { rate: 4, userId: 3, ratedUserId: 1 },
    ],
    userSkills: [
        { userId: 1, skillId: 2 },
        { userId: 1, skillId: 1 },
        { userId: 2, skillId: 2 },
        { userId: 2, skillId: 3 },
        { userId: 2, skillId: 4 },
    ],
}

module.exports = data;