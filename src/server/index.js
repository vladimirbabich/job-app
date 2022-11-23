require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');
const models = require('./models/models');

app.get('/', (req, res) => {
    res.send('111');
})


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(process.env.PORT, () => {
            console.log('server is running: ' + process.env.PORT);
        })
    } catch (e) {
        console.log(e);
    }
}

start();