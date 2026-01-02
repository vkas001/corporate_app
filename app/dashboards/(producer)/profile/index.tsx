import BillingScreen from "@/app/dashboards/(producer)/profile/billings";
import EditProfileScreen from "@/app/dashboards/(producer)/profile/edit";
import SettingsScreen from "@/app/dashboards/(producer)/profile/settings";
import UserManagementScreen from "@/app/dashboards/(producer)/profile/users";
import Loading from "@/components/common/loading";
import ProfileScreen from "@/components/profile/ProfileScreen";
import CustomHeader from "@/components/ui/CustomHeader";
import { useTheme } from '@/theme/themeContext';
import { logout } from "@/utils/auth";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoScreen from "./info";
import { View } from "react-native";

type Screen = 'profile' | 'edit' | 'settings' | 'billing' | 'users' | 'info';

export default function ProducerProfile() {
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    if (action === "logout") {
      try {
        await logout();
        router.replace("/(auth)/sign-in");
        return;
      } finally {
        setIsLoading(false);
      }
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

    setIsLoading(false);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, position: "relative" }}>
      {currentScreen === 'profile' && (
        <>
          <CustomHeader title="Profile" />
          <ProfileScreen
            role="producer"
            name={profileData.name}
            email={profileData.email}
            avatarUri={avatar}
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

      {isLoading && (
        <View
          className="absolute inset-0 items-center justify-center"
          style={{ backgroundColor: colors.background + "E6" }}
        >
          <Loading message="Loading profile..." fullscreen={false} />
        </View>
      )}
    </SafeAreaView>
  );
}