const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    coinId: String,
    price: Number,
    marketCap: Number,
    change24h: Number,
    time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Crypto', cryptoSchema);
