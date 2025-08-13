import express from "express";

import {
  loginController,
  registerController,
  requireSignIn,
  updateUserController,
} from "../controller/userControllers.js";

 
const userRouter = express.Router();

// Login
userRouter.post("/login", loginController);
// Register
userRouter.post("/register", registerController);
// Update the user
userRouter.put("/update-user",requireSignIn, updateUserController);

export default userRouter;


