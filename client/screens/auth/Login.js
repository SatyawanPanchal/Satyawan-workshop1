import { Alert, ScrollView, Text } from "react-native";
import React, { useContext, useState } from "react";
import InputBox from "./../../components/forms/InputBox.js";
import SubmitButton from "./../../components/forms/SubmitButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/context/useContext.js";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, setState } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      if (!password || !email) {
        return Alert.alert("enter email and pass both");
      }
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      //setState(JSON.stringify(res.data));
      if (res.data.success) {
        Alert.alert(res.data.message);
        console.log(`${res.data.token} is data from server......>>>`);
      }
      if (!res.data.success) {
        Alert.alert(res.data.message);
        console.log(`${res.data.message} is an error as success is false`);
      }

      const dataForStorage = JSON.stringify({
        token: res.data.token,
        user: res.data.user,
      });

      // console.log("data for the storage ---->", dataForStorage);

      await AsyncStorage.setItem("@auth", dataForStorage);

     // console.log("here we go with =======> contents of async storage");

      const dataFromStorage = await AsyncStorage.getItem("@auth");
      // console.log("=====>>>>", JSON.parse(dataFromStorage));

      navigation.navigate("Cart");
      // navigation.navigate("Cart");
    } catch (error) {
      Alert.alert(`${error.message} is an error`);
      console.log(`${error.message}`);
    }
  };
  //console.log(`value of state in login .....state`,JSON.stringify(state) );

  return (
    <ScrollView>
      <Text>Login Page</Text>
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
      <SubmitButton btnTitle={"Login Button"} handleSubmit={handleSubmit} />

      <Text>
        Not Registered yet
        <Text onPress={() => navigation.navigate("Register")}>
          ...Register First
        </Text>
      </Text>
    </ScrollView>
  );
}
