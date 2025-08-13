import express from 'express';
import { requireSignIn } from '../controller/userControllers.js';
import { createPostController } from '../controller/postControllers.js';

// router object
const postRouter=express.Router();

// Creating the post

postRouter.post("/create-post",requireSignIn,createPostController);

export default postRouter;


