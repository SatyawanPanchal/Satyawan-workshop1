import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext, AuthProvider } from "@/context/useContext.js";

import Register from "@/screens/auth/Register.js";
import Login from "@/screens/auth/Login.js";
import Cart from "./../screens/cart/cart.js";
import { useContext } from "react";
export default function Index() {
 // const {state, setState} = useContext(AuthContext);
  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName="Cart">
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
