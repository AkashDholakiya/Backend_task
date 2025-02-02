import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
 
export default async function connect() {
    try {
        console.log(process.env.NODE_ENV === "TEST" ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI_DEV);
        await mongoose.connect(process.env.NODE_ENV === "TEST" ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI_DEV);
        console.log("Database connected");
    } catch (error) {
        console.log("Error occured", error.message);
    }
}
 