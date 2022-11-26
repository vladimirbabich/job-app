const creationDate = new Date();
const data = {
    users: [
        {
            name: 'Joe',
            email: 'joe@gmail.com',
            phone: '324s3252asssd32фыв0',
            pass: '1234576',
            about: `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna 
            aliqua. Lorem ipsum dolor sit amet
            . Nullam non nisi est sit amet facilisis magna.
             Pellentesque massa placerat duis ultricies lacus sed turpis. Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Eget nunc scelerisque viverra mauris. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Massa sapien faucibus et molestie. Orci nulla pellentesque dignissim enim sit amet. Arcu dictum varius duis at consectetur lorem donec massa. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Leo a diam sollicitudin tempor id. Neque ornare aenean euismod elementum. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Ullamcorper malesuada proin libero nunc. Commodo ullamcorper a lacus vestibulum sed. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Dolor morbi non arcu risus quis varius quam quisque id. Nunc scelerisque viverra mauris in. Quis blandit turpis cursus in hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada. Pretium nibh ipsum consequat nisl vel pretium lectus quam id. Luctus accumsan tortor posuere ac ut consequat. Tempus urna et pharetra pharetra massa massa ultricies mi. Nisi scelerisque eu ultrices vitae auctor eu. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Faucibus interdum posuere lorem ipsum dolor sit amet. Pretium nibh ipsum consequat nisl vel pretium lectus quam. Porta non pulvinar neque laoreet suspendisse interdum. At urna condimentum mattis pellentesque id. Et leo duis ut diam quam nulla. Parturient montes nascetur ridiculus mus. Sed elementum tempus egestas sed sed. Bibendum at varius vel pharetra vel turpis nunc eget. Morbi tristique senectus et netus et malesuada. Lectus arcu bibendum at varius vel pharetra. Ornare arcu odio ut sem. Varius quam quisque id diam vel. Aliquam ut porttitor leo a. Sem nulla pharetra diam sit amet nisl suscipit.`,
            createdAt: creationDate,
            updatedAt: creationDate
        },
        {
            name: 'Frasnk',
            email: 'frank@gmail.com',
            phone: '93792939123',
            pass: 'passsw',
            about: 'Lorem ipsum dolor sit amet, consectetur.',
            createdAt: creationDate,
            updatedAt: creationDate
        },
        {
            name: 'Anna',
            email: 'anna@gmail.com',
            phone: '98787987',
            pass: 'gdfgdg',
            about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet. Nullam non nisi est sit amet facilisis magna. Pellentesque massa placerat duis ultricies lacus sed turpis. Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Eget nunc scelerisque viverra mauris. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Massa sapien faucibus et molestie. Orci nulla pellentesque dignissim enim sit amet. Arcu dictum varius duis at consectetur lorem donec massa. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Leo a diam sollicitudin tempor id. Neque ornare aenean euismod elementum. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Ullamcorper malesuada proin libero nunc. Commodo ullamcorper a lacus vestibulum sed. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Dolor morbi non arcu risus quis varius quam quisque id. Nunc scelerisque viverra mauris in. Quis blandit turpis cursus in hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada. Pretium nibh ipsum consequat nisl vel pretium lectus quam id. Luctus accumsan tortor posuere ac ut consequat. Tempus urna et pharetra pharetra massa massa ultricies mi. Nisi scelerisque eu ultrices vitae auctor eu. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Faucibus interdum posuere lorem ipsum dolor sit amet. Pretium nibh ipsum consequat nisl vel pretium lectus quam. Porta non pulvinar neque laoreet suspendisse interdum. At urna condimentum mattis pellentesque id. Et leo duis ut diam quam nulla. Parturient montes nascetur ridiculus mus. Sed elementum tempus egestas sed sed. Bibendum at varius vel pharetra vel turpis nunc eget. Morbi tristique senectus et netus et malesuada. Lectus arcu bibendum at varius vel pharetra. Ornare arcu odio ut sem. Varius quam quisque id diam vel. Aliquam ut porttitor leo a. Sem nulla pharetra diam sit amet nisl suscipit.',
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