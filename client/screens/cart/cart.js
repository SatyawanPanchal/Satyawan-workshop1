import {   Alert, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cart({navigation}) {
    const handleLogout=async()=>{
        await AsyncStorage.removeItem("@auth");
        console.log('logged out');
        Alert.alert("you are logging out")
        navigation.navigate("Login");

        
    }
  return (
    <View>
      <Text>login success .. i am in cart</Text>
      <TouchableOpacity>
        <Text onPress={handleLogout}>logout</Text>
      </TouchableOpacity>
    </View>
  );
}

 
