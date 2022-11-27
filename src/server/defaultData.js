const creationDate = new Date();
const data = {
    users: [
        {
            name: 'Joe',
            email: 'joe@gmail.com',
            phone: '324s3252asssd32фыв0',
            pass: '1234576',
            createdAt: creationDate,
            updatedAt: creationDate
        },
        {
            name: 'Frasnk',
            email: 'frank@gmail.com',
            phone: '93792939123',
            pass: 'passsw',
            createdAt: creationDate,
            updatedAt: creationDate
        },
        {
            name: 'Anna',
            email: 'anna@gmail.com',
            phone: '98787987',
            pass: 'gdfgdg',
            createdAt: creationDate,
            updatedAt: creationDate
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
            originalName: 'orig.png',
        },
        {
            jobId: 1,
            fileName: '2134213asdasd123123.png',
            originalName: 'orig1.png',
        },
        {
            jobId: 2,
            fileName: 'asfasdaasdasdsdfas.png',
            originalName: 'orig2.png',
        },
    ],
    ratings: [
        {
            ratedUserId: 1, rate: 5, userId: 3,
        },
        {
            ratedUserId: 1, rate: 3, userId: 2,
        },
        {
            ratedUserId: 1, rate: 2, userId: 1,
        },
        {
            ratedUserId: 3, rate: 5, userId: 1,
        }
    ]
}

module.exports = data;