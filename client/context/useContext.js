import { useEffect,useState,createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; 

const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  // setting default url setting for server

  axios.defaults.baseURL="http://192.168.31.57:5000";
  useEffect(()=>{
const getStorageData=async()=>{
    const data=await AsyncStorage.getItem("@auth");
    const dataFromStorage=JSON.parse(data);
    setState({...state,user:dataFromStorage?.user,token:dataFromStorage?.token});
}
getStorageData();


  },[]);
  useEffect(()=>{

  },[])
return(
    <AuthContext.Provider value={{state, setState}}>
  {children}
</AuthContext.Provider>
)

};

export {AuthContext,AuthProvider};
