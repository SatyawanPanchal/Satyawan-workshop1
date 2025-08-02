import express from 'express'
import {loginController,registerController} from '../controller/userControllers.js'
 

const userRouter= express.Router();

userRouter.post("/login",loginController);
userRouter.post("/register",registerController);

export default userRouter;