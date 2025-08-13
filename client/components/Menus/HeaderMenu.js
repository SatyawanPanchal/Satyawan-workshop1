import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "@/context/useContext.js";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderMenu = () => {
  const { state, setState } = useContext(AuthContext);
  const handleLogout = async() => {

    setState((prev)=>({
        ...prev,
        user:null,
        token:'',
    }))

    await AsyncStorage.removeItem('@auth');
    Alert.alert('logged out successfully')


  };
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="logout" size={24} color="red" />
      <TouchableOpacity onPress={handleLogout}>
        <Text> out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
  },
});
export default HeaderMenu;
