const axios = require('axios');
const Crypto = require('../Models/crypto.js');

const cryptoData = async () => {
    try {
        const cryptoCoins = ['bitcoin', 'matic-network', 'ethereum'];
        const url = `https://api.coingecko.com/api/v3/simple/price`;
        const { data } = await axios.get(url, {
            params: {
                ids: cryptoCoins.join(','),
                vs_currencies: 'usd',
                include_market_cap: true,
                include_24hr_change: true,
            },
        });

        const records = cryptoCoins.map(coin => ({
            coinId: coin,
            price: data[coin].usd,
            marketCap: data[coin].usd_market_cap,
            change24h: data[coin].usd_24h_change,
        }));

        await Crypto.insertMany(records);
        console.log('Crypto data fetched and saved.');
    } catch (error) {
        console.error('Error fetching crypto data:', error.message);
    }
};

module.exports = cryptoData;
