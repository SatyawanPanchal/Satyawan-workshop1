import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputBox from "./../../components/forms/InputBox.js";
import SubmitButton from './../../components/forms/SubmitButton';

export default function login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit=async()=>{

    if(!password || !email)
    {
        return Alert.alert("enter email and pass both")
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

const styles = StyleSheet.create({});
