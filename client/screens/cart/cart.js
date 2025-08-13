/* eslint-disable no-unused-vars */
import { Alert, SafeAreaView, Text, TouchableOpacity} from "react-native";
import React, {   useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/context/useContext.js";

export default function Cart({ navigation }) {
  const { state, setState } = useContext(AuthContext);
  const handleLogout = async () => {
    console.log('state value =');
    
    await AsyncStorage.removeItem("@auth");
    console.log("logged out");
    Alert.alert("you are logging out");
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView>
      <Text>login success .. i am in cart{JSON.stringify(state,null,4)}</Text>
      <TouchableOpacity>
        <Text onPress={handleLogout}>logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

