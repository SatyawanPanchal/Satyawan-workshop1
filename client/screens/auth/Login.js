import { Alert, ScrollView,   Text  } from "react-native";
import React, { useState } from "react";
import InputBox from "./../../components/forms/InputBox.js";
import SubmitButton from './../../components/forms/SubmitButton';
import axios from "axios";

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit=async()=>{

    if(!password || !email)
    {
        return Alert.alert("enter email and pass both")
    }
const res = await axios.post(
        "http://192.168.31.57:5000/api/auth/login",
        { email, password }
      );

      if(res.data)
      {
        Alert.alert("data submitted successfully");
      }


  }
  return (
    <ScrollView>
      <Text>Login Page</Text>
      <InputBox 
      inputTitle={"Email"}
      placeholder={"Enter email"} 
      value={email}
      setValue={setEmail} />

      <InputBox
        inputTitle={"Password"}
        placeholder={"enter your password"}
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <SubmitButton
        btnTitle={"Login Button"}
        handleSubmit={handleSubmit}
      />

        <Text>
                  Not Registered yet
                  <Text onPress={()=>navigation.navigate("Register")}>...Register First</Text>
              </Text>
    </ScrollView>
  );
}

 
