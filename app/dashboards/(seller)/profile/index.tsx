import BillingScreen from "@/app/dashboards/(seller)/profile/billings";
import EditProfileScreen from "@/app/dashboards/(seller)/profile/edit";
import SettingsScreen from "@/app/dashboards/(seller)/profile/settings";
import UserManagementScreen from "@/app/dashboards/(seller)/profile/users";
import ProfileScreen from "@/components/profile/ProfileScreen";
import CustomHeader from "@/components/ui/CustomHeader";
import { useTheme } from '@/theme/themeContext';
import { logout } from "@/utils/auth";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoScreen from "./info";

type Screen = 'profile' | 'edit' | 'settings' | 'billing' | 'users' | 'info';

export default function SellerProfile() {
  const { colors } = useTheme();

  const [avatar, setAvatar] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('profile');
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    company: 'Egg Corporate',
  });

  const handleEditAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Permission required\n\nPermission to access media");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      router.replace("/(auth)/sign-in");
      return;
    }

    switch (action) {
      case "edit-profile":
        setCurrentScreen('edit');
        break;
      case "settings":
        setCurrentScreen('settings');
        break;
      case "billing":
        setCurrentScreen('billing');
        break;
      case "users":
        setCurrentScreen('users');
        break;
      case "info":
        setCurrentScreen('info');
        break;
      default:
        console.log("Action:", action);
    }
  };

  const handleSaveProfile = (data: any) => {
    console.log('Profile saved:', data);
    setProfileData(data);
    setCurrentScreen('profile');
  };

  const handleScreenClose = () => {
    setCurrentScreen('profile');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {currentScreen === 'profile' && (
        <>
          <CustomHeader title="Profile" />
          <ProfileScreen
            role="seller"
            name={profileData.name}
            email={profileData.email}
            onAction={handleAction}
            onEditAvatar={handleEditAvatar}
          />
        </>
      )}

      {currentScreen === 'edit' && (
        <EditProfileScreen
          initialData={profileData}
          onSave={handleSaveProfile}
          onCancel={handleScreenClose}
        />
      )}

      {currentScreen === 'settings' && (
        <SettingsScreen onClose={handleScreenClose} />
      )}

      {currentScreen === 'billing' && (
        <BillingScreen onClose={handleScreenClose} />
      )}

      {currentScreen === 'users' && (
        <UserManagementScreen onClose={handleScreenClose} />
      )}
      {currentScreen === 'info' && (
        <InfoScreen onClose={handleScreenClose} />
      )}
    </SafeAreaView>
  );
}