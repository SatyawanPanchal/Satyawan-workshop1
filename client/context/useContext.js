import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Children } from "react";

const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

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
