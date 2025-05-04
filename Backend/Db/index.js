import mongoose from "mongoose"
import dotenv from "dotenv"
import { DB_NAME } from "../constants.js"

dotenv.config()

const connectDB = async () => {
    try {
        mongoose.set("debug", true);  // Enable debugging logs
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/inventoryDB`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`✅ MongoDB connected at: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message)
        process.exit(1)  // Exit the app if MongoDB fails
    }
}

export default connectDB;
