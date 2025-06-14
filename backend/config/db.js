import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); 
        console.log(`Mongo DB Conncted Successfully : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error message : ${error}`);
        process.exit(1); //process code 1 means with exit with failure , 0 means success
    }
}