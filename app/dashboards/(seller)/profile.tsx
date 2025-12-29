import ProfileScreen from "@/components/profile/ProfileScreen";
import { logout } from "@/utils/auth";
import { router } from "expo-router";
import React from "react";

export default function SellerProfile() {
  const handleAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      router.replace("/(auth)/sign-in");
      return;
    }

    console.log("Action:", action);
  };

  return (
    <ProfileScreen
      role="seller"
      name="Jane Smith"
      email="jane.smith@example.com"
      onAction={handleAction}
      onEditAvatar={() => {
        console.log("Edit avatar");
        // Handle avatar edit
      }}
    />
  );
}
