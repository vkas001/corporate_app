import ProfileScreen from "@/components/profile/ProfileScreen";
import React from "react";

export default function SellerProfile() {
  return (
    <ProfileScreen
      role="seller"
      name="Jane Smith"
      email="jane.smith@example.com"
      onAction={(action) => {
        console.log("Action:", action);
        // Handle actions like: edit-profile, settings, products, payouts, logout
      }}
      onEditAvatar={() => {
        console.log("Edit avatar");
        // Handle avatar edit
      }}
    />
  );
}
