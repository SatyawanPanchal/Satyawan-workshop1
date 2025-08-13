import React from "react";
import ScreenMenu from "./components/Menus/ScreenMenu.js";
import { AuthProvider } from "@/context/useContext.js";
import { SafeAreaView } from "react-native";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <ScreenMenu />
    </AuthProvider>
  );
};

export default RootNavigation;
