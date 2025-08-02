import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SubmitButton from "@/components/forms/SubmitButton";
import InputBox from "@/components/forms/InputBox";

export default function Register({navigation}) {
      const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit=()=>{
if(!password || !email)
    {
        return Alert.alert("enter name, email and pass")
    }
}

  return (
      <ScrollView>
        <Text>Registration Page</Text>
        
        <InputBox 
        inputTitle={"Name"}
        placeholder={"Enter Your Name"} 
        value={name}
        setValue={setName} />
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
          btnTitle={"Registration Button"}
          handleSubmit={handleSubmit}
        />

        <Text>
            Already Registered
            <Text onPress={()=>navigation.navigate("Login")}>...Login here</Text>
        </Text>
      </ScrollView>
    );
}

const styles = StyleSheet.create({});
