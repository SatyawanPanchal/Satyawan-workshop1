import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function InputBox({placeholder,secureTextEntry=false,value,setValue}) {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text)=>{setValue(text)}}
      />
         
    </View>
  );
}

const styles = StyleSheet.create({});
