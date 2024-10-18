const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function mongoConnect() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("database connection established");
    } catch (error) {
        console.log("error : ",error);
    }
};
module.exports = mongoConnect;