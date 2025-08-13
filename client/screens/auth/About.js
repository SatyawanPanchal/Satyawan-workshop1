import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import  FooterMenu  from '@/components/Menus/FooterMenu.js';
import { AuthContext } from "@/context/useContext";

export default function About() {
  const {state,setState}=useContext(AuthContext);
  return (
    <View style={styles.container} >
      <Text>Name:{state?.user?.name}</Text>
      <Text>Email:{state?.user?.email}</Text>
      <Text>Role:{state?.user?.role}</Text>
     <View style={styles.fmenu}>
      {/* for the footer */}
     <FooterMenu/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:10,
        justifyContent:'space-between',
        marginTop:40,
    }, fmenu: {
    paddingBottom: 30,
  },
});
