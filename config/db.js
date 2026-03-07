const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectdb = async () => {
    if (mongoose.connection.readyState === 1) return;
    if (mongoose.connection.readyState === 2) return;

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to MongoDB");
    } catch (err) {
        console.log("error connecting to MongoDB", err);
        throw err;
    }
};

module.exports = connectdb;
