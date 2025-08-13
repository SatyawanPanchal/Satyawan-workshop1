import {   StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo1 from '@expo/vector-icons/Entypo';
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";

 

export default function FooterMenu() {
  const navigation=useNavigation();
  const route=useRoute();
  return (
    <View style={styles.container}>
     
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Home')}>
      <Entypo name="home" size={24} color={route.name==="Home"?"red":"black"} />
      
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn}  onPress={()=>navigation.navigate('Post')}>
        <MaterialCommunityIcons name="post" size={24} color={route.name==="Post"?"red":"black"} />
        <Text>Post</Text>
        
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('About')}>
        <Entypo1 name="info" size={24} color={route.name==="About"?"red":"black"} />
        <Text>About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Account')}>
        <MaterialIcons name="account-circle" size={24} color={route.name==="Account"?"red":"black"} />
        <Text>Account</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
 
    justifyContent: "space-around",
marginBottom:20,
    flexDirection: "row",
  },
  btn:{
    
    flexDirection:'row',
    gap:2,
    backgroundColor:'beige',
    borderRadius:10,
  }
});
