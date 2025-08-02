
import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL) ;
        console.log(`database ${mongoose.connection.host} is connected well`);
        
        
    } catch (error) {
        
    }
}

export default connectDB;