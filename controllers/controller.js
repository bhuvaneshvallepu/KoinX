const Crypto = require('./Models/crypto.js');

const getStats = async (req, res) => {
    try {
        const { coin } = req.query;
        const latestRecord = await Crypto.findOne({ coinId: coin }).sort({ time: -1 });

        if (!latestRecord) return res.status(404).json({ message: 'No data found for the requested coin.' });

        res.json({
            price: latestRecord.price,
            marketCap: latestRecord.marketCap,
            '24hChange': latestRecord.change24h,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const calculateDeviation = async (req, res) => {
    try {
        const { coin } = req.query;
        const records = await Crypto.find({ coinId: coin }).sort({ timestamp: -1 }).limit(100);

        if (records.length === 0) return res.status(404).json({ message: 'No data available for the requested coin.' });

        const prices = records.map(record => record.price);
        const mean = prices.reduce((sum, value) => sum + value, 0) / prices.length;
        const variance = prices.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / prices.length;
        const deviation = Math.sqrt(variance);

        res.json({ deviation: deviation.toFixed(2) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getStats,calculateDeviation };
