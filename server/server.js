import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'
import userRouter from './router/userRoutes.js';

dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;
app.use(cors());
app.use(express.json());

app.use("/user",userRouter);
app.get('/',(req,res)=>{
    console.log(`server is running `.bgGreen.white);
    
})

app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`.bgRed.white);
})

app.get('/ping',(req,res)=>{
   res.send("pong");
    
})