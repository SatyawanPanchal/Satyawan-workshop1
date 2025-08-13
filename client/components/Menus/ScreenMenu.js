import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./../../screens/Home";
import Register from "./../../screens/auth/Register.js";
import Login from "./../../screens/auth/Login.js";

import { AuthContext } from "@/context/useContext.js";
import HeaderMenu from './HeaderMenu.js';
import Post from './../../screens/auth/Post.js';
import Account from './../../screens/auth/Account.js';
import About from './../../screens/auth/About.js';

export default function ScreenMenu() {
  const Stack = createNativeStackNavigator();
  const { state } = useContext(AuthContext);
  //   auth contition checker
  const authenticatedUser = state?.user && state?.token;

  return (
    <>
      <Stack.Navigator   initialRouteName="Login">
        {authenticatedUser ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ 
                title:"Full Stack App",
                headerRight:()=><HeaderMenu/>
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="Post"
              component={Post}
              options={{ 
                title:"Post",
                headerRight:()=><HeaderMenu/>
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="Account"
              component={Account}
              options={{ 
                title:"Account",
                headerRight:()=><HeaderMenu/>
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="About"
              component={About}
              options={{ 
                title:"About",
                headerRight:()=><HeaderMenu/>
              }}
            ></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title:"Registration/Login" }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title:"Registration/Login" 
              
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
