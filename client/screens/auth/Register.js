import { Alert, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import SubmitButton from "@/components/forms/SubmitButton";
import InputBox from "@/components/forms/InputBox";
import axios from "axios";

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!name || !password || !email) {
      return Alert.alert("enter name, email and pass");
    }

    try {
      const res = await axios.post(
        "http://192.168.31.57:5000/api/auth/register",
        { name, email, password }
      );

      if (!res.data.success) {
        Alert.alert(res.data.message);
      }
      if (res.data.success) {
        Alert.alert(res.data.message);
      }
    } catch (error) {
      Alert.alert(`error occured is ${error.response.message}  `);
      console.log(`error ${error.message}`);
       
    }
  };

  return (
    <ScrollView>
      <Text>Registration Page</Text>

      <InputBox
        inputTitle={"Name"}
        placeholder={"Enter Your Name"}
        value={name}
        setValue={setName}
      />
      <InputBox
        inputTitle={"Email"}
        placeholder={"Enter email"}
        value={email}
        setValue={setEmail}
      />

      <InputBox
        inputTitle={"Password"}
        placeholder={"enter your password"}
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <SubmitButton
        btnTitle={"Registration Button"}
        handleSubmit={handleSubmit}
      />

      <Text>
        Already Registered
        <Text onPress={() => navigation.navigate("Login")}>...Login here</Text>
      </Text>
    </ScrollView>
  );
}
