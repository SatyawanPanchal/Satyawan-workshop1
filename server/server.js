import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'
import userRouter from './router/userRoutes.js';
import connectDB from './config/db.js';
 
import postRouter from './router/postRoutes.js';

dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/auth",userRouter);
app.use("/api/post",postRouter);
app.get('/',(req,res)=>{
    console.log(`server is running `.bgGreen.white);
    
})

app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`.bgRed.white);
})

app.get('/ping',(req,res)=>{
   res.send("pong");
    
})