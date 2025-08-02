import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add name"],
    
      trim: true,
    },
    email: {
        type:String,
        required:[true, 'please add email'],
        unique:true,
        trim:true,     
    },
    password: {
        type:String,
        required:[true, 'please add email'],
        min:5,
        max:20,
        trim:true,     
    },
    role: {
        type:String,
        default:'user'
    },
  },
  { timestamp: true }
);

export const User=mongoose.model("User",userSchema);
