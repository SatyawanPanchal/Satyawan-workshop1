import { hashPassword,comparePassword } from "../util/passUtils.js";
import { User } from './../models/userModel.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

// login controller here
// 
// 

const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log("details in login  =", req.body);

  try {
    if (!email || !password) {
      return res.json({
        success: false,
        message: "email or password is not given",
      });
    }

    const ExistingUser = await User.findOne({ email });
    console.log(`${ExistingUser} is existing user---->`);
    

    if (!ExistingUser) {
      return res.json({
        success: false,
        message: `${email} not registered`,
      });
    }
    //  if user is found compare the hashed password
    const passwordByUser = password;
    const passwordFromDatabase = ExistingUser.password;

    const ValidPassword = await comparePassword(
      passwordByUser,
      passwordFromDatabase
    );
    console.log("password is valid --->", ValidPassword);

    if(!ValidPassword)
    {
        return res.json({
            success:false,
            message:`password is not valid`,
        })
    }

 
    

    const token = jwt.sign(
        { _id: ExistingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // creating a token and sending it to user for further communication

    if(ValidPassword &&ExistingUser)
    {

        
        ExistingUser.password = undefined;
        res.json({
            success: true,
            message: `user ${ExistingUser.name}  login successful`,
            token:token,
             user:{id:ExistingUser._id,
                name:ExistingUser.name,
                email:ExistingUser.email,

             },
        });
    }
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
   
    //  check if this is existing user

    const isExixtingUser = await User.findOne({ email });

    if (isExixtingUser) {
      return res.json({
        success: false,
        message: `${email}user already  exists `,
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
        message: `${userSaved.email} saved successfully`,
      });
    }
  } catch (error) {
    console.log(`error in register ${error.message}`.bgBlack.white);
    res.status.json({
      success: false,
      message: `error occured as ${error.message}`,
    });
    return;
  }
};

export {loginController,registerController};




