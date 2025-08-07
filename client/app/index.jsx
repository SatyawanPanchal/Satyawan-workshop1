import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {  AuthProvider } from "@/context/useContext.js";

import Register from "@/screens/auth/Register.js";
import Login from "@/screens/auth/Login.js";
import Cart from "./../screens/cart/cart.js";
 
import Home from "./../screens/Home.js";
export default function Index() {
  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        >
          
        </Stack.Screen>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </AuthProvider>
  );
}
