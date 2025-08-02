import { createNativeStackNavigator } from "@react-navigation/native-stack";
 
 
import Register from '@/screens/auth/Register.js';
import Login from "@/screens/auth/Login.js";
export default function Index() {
  const Stack=createNativeStackNavigator();
  return (
     <Stack.Navigator initialRouteName="Register">
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>

     </Stack.Navigator>
  );
}
