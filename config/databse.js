const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.mongoDB_url);
        console.log("Database Connected Successfuly")
    }catch(e){
        console.error(`Error connecting to Databse: ${e.message}`)
        process.exit(1)
    }
}
module.exports = connectDB