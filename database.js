const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbUrl=process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};
module.exports = connectDB;
