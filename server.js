const cron = require('node-cron');
const connectDB = require('./database');
const express = require('express');
const app = express();

const cryptoData = require('./Job/data.js');

connectDB();
cron.schedule('0 */2 * * *', cryptoData);


cryptoData().then(() => console.log('Initial fetch complete.'));

app.get('/', (req, res) => {
    res.send('Welcome to the Crypto API!');
});






