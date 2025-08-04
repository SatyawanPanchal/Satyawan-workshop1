import { hashPassword,comparePassword } from "../util/passUtils.js";
import { User } from './../models/userModel.js';
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log("details in login  =", req.body);

  try {
    if (!email || !password) {
      return res.send({
        success: false,
        message: "email or password is not given",
      });
    }

    const isExistingUser = await User.findOne({ email });

    if (!isExistingUser) {
      return res.send({
        success: false,
        message: `user doesnt exist`,
      });
    }
    //  if user is found compare the hashed password
    const passwordByUser = password;
    const passwordFromDatabase = isExistingUser.password;

    const isValidPassword = await comparePassword(
      passwordByUser,
      passwordFromDatabase
    );
    console.log("password is valid --->", isValidPassword);

    // creating a token and sending it to user for further communication

    const token = await jwt.sign(
      { _id: isExistingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    isExistingUser.password = undefined;
    res.send({
      success: true,
      message: `user ${isExistingUser.name} is found and login successful`,
      isExistingUser,
      token,
    });
    console.log("user details", token);
  } catch (error) {
    console.log(`some error occured as ----> ${error.message}`.bgCyan.red);
    return res.send({
      success: false,
      message: `we caught an error ${error.message}`,
    });
  }
};

const registerController=async(req,res)=>{
  console.log(`in register with data ${req.body.name}`.bgGreen.yellow);
  console.log("i am called in register with data", req.body);

  try {
    const { name, email, password } = req.body;
    // check if all fields are recieved
    if (!name || !email || !password) {
      res.status(400).send({
        success: false,
        message: "all fields are not recieved at backend",
      });
      return;
    }
    //  check if this is existing user

    const isExixtingUser = await User.findOne({ email });

    if (isExixtingUser) {
      return res.status(500).json({
        success: false,
        message: "user is  existing ",
      });
    }

    // ok now all data recived well and user is not already existing so lets
    // put the data in collections

    const encryptedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
    });

    const userSaved = await newUser.save();
    if (userSaved) {
      res.json({
        success: true,
        nameSaved:userSaved.name,
        message: `all is well here , lets put data in database`,
      });
    }
  } catch (error) {
    console.log(`error in register ${error.message}`.bgBlack.white);
    res.status(501).send({
      success: false,
      message: `error occured as ${error.message}`,
    });
    return;
  }
};

export {loginController,registerController};




