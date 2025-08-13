import { hashPassword, comparePassword } from "../util/passUtils.js";
import { User } from "./../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { expressjwt as JWT } from "express-jwt";
 

dotenv.config();

// login controller here
//
//

const requireSignIn=JWT({
  secret:process.env.JWT_SECRET,
  algorithms:["HS256"],
})

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

    if (!ValidPassword) {
      return res.json({
        success: false,
        message: `password is not valid`,
      });
    }

    const token = jwt.sign({ _id: ExistingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // creating a token and sending it to user for further communication

    if (ValidPassword && ExistingUser) {
//ExistingUser.password = undefined;
      const objectTosend={
        success: true,
        message: `user ${ExistingUser.name}  login successful`,
        token: token,
        user: {
          id: ExistingUser._id,
          name: ExistingUser.name,
          
          email: ExistingUser.email,
          role: ExistingUser.role,
        },
      }
      console.log('response from login in server',objectTosend);
      
      res.json(objectTosend);
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

const registerController = async (req, res) => {
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
        nameSaved: userSaved.name,
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

//  updating the users

const updateUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log('  recieved data in update-user ',req.body);
    

    if (!email) {
      return res.json({ success: false, message: "Email is required." });
    }
    // find the user in database
    const userInDatabase = await User.findOne({ email:email });
     
 



    console.log('ok now we are going to change the password or name');
    
    //  hash or encode the password from
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // update the user
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        name: name || userInDatabase.name,
        password: hashedPassword || userInDatabase.password,
      },
      { new: true }
    );
    updatedUser.password = undefined;

    res.json({
      success: true,
      message: `${updatedUser.name}Profile updated successfully,Login Again`,
      updatedUser:updatedUser,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "error in user update api",
      error,
    });
  }
};

export { loginController, registerController, updateUserController,requireSignIn };
