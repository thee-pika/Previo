import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectDB = async () => {
    try {
        const DB_URL = process.env.MONGO_URI;
        if (!DB_URL) {
            throw new Error("DB_URL is not defined");
        }
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
};

export default connectDB;

