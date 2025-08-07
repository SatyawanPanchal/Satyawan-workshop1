import {   Text, View } from "react-native";
import React, { createContext } from "react";
import { AuthContext } from "@/context/useContext.js";

export default function Home() {
const {state}=createContext(AuthContext);
    return (
    <View>
    <Text>i am at home page</Text>
      <Text>{state}</Text>
    </View>
  );
}

 
