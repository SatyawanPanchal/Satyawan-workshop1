import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "@/context/useContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FooterMenu from "@/components/Menus/FooterMenu.js";

export default function Home({ navigation })
{
  const { state, setState } = useContext(AuthContext);
  const handleLogout = async () => {
    console.log("state value =");

    await AsyncStorage.removeItem("@auth");
    setState(null);
    console.log("logged out");
    Alert.alert("you are logging out");
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Text>login success .. i am in cart{JSON.stringify(state, null, 4)}</Text>
      <TouchableOpacity>
        <Text onPress={handleLogout}>logout</Text>
      </TouchableOpacity>

      <View style={styles.fmenu}>
      {/* for the footer */}
     <FooterMenu/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  fmenu: {
    paddingBottom: 30,
  },
});
