import mongoose from "mongoose";


const connectToMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect To MongoDB");
        
    } catch (error) {
        console.log("Error Connecting to MongoDB",error.message);
        
    }
}

export default connectToMongoDB