// Purpose: Connect to MongoDB database using mongoose
// Input: MONGO_URI from .env file
require('dotenv').config();
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('MongoDB connection SUCCESS');
    } catch (error) {
        console.error('MongoDB connection FAIL');
        process.exit(1);
    }
}

module.exports = connectDB;