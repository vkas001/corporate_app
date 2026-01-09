import LogoutModal from "@/components/common/logou";
import { logout as logoutService } from "@/services/authService";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useLogout = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await logoutService();
      setShowModal(false);
      router.replace("/(auth)/sign-in");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Logout failed");
      setIsLoggingOut(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return {
    handleLogout,
    showModal,
    handleConfirm,
    handleCancel,
    isLoggingOut,
    LogoutModal,
  };
};
