import { useEffect,useState,createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; 

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
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  // setting default url setting for server

//  axios.defaults.baseURL="http://192.168.31.57:5000";
  // // axios.defaults.baseURL="http://192.168.1.2:5000";
   axios.defaults.baseURL="http://10.26.174.16:5000";
axios.defaults.headers.common["Authorization"]=`Bearer ${state?.token}`


  useEffect(()=>{

  },[])
return(
    <AuthContext.Provider value={{state, setState}}>
  {children}
</AuthContext.Provider>
)

};

export {AuthContext,AuthProvider};
