const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Hurray! Database Connected");
    } catch(err){
        console.log(err);
    }
};

module.exports = connectDB;