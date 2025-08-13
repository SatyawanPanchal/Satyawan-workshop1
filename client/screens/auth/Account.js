import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import FooterMenu from "@/components/Menus/FooterMenu.js";
import { AuthContext } from "@/context/useContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Account() {
  const { state, setState } = useContext(AuthContext);
  const { user, token } = state;
  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
   

  const handleUpdate = async () => {
    try {
      setLoading(true);
      console.log("data we are sending is ", state, user?.email, name, email);

      const { data } = await axios.put(
        "/api/auth/update-user",
        {
          name,
          password,
          email,
        },
         
         
      );

      // now if we have updated it successfully we can
      // 1. Give a message for the updation.
      // 2. remove auth data from async Storage which will logout us.
      if (data.success) {
        Alert.alert(data.message);
        await AsyncStorage.removeItem("@auth");
        router.replace("/");
        setLoading(false);
      }
      if (!data.success) {
        Alert.alert("something missing ");
      }
    } catch (error) {
      Alert.alert(error.response.data.message);
      setLoading(false);
      console.log("error", error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            }}
            style={{ height: 200, width: 200, borderRadius: 100 }}
          />
        </View>

        <Text style={styles.warningtext}>
          Currently You Can Only Update Your Name And Password*
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        {/* for email */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput style={styles.inputBox} value={email} editable={false} />
        </View>
        {/* for password */}

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        {/* for role of the user */}

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Role</Text>
          <TextInput
            style={styles.inputBox}
            value={state?.user.role}
            editable={false}
          />
        </View>

        {/* update profile button */}

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateBtnText}>
              {loading ? "Please wait" : "Update Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.fmenu}>
        {/* for the footer */}
        <FooterMenu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
  warningtext: {
    color: "red",
    fontSize: 13,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 20,
    borderRadius: 5,
  },
  updateBtn: {
    backgroundColor: "black",
    color: "white",
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtnText: {
    color: "#ffff",
    fontSize: 16,
    textAlign: "center",
  },
});
