import BillingScreen from "@/app/dashboards/(producer)/profile/billings";
import EditProfileScreen from "@/app/dashboards/(producer)/profile/edit";
import SettingsScreen from "@/app/dashboards/(producer)/profile/settings";
import UserManagementScreen from "@/app/dashboards/(producer)/profile/users";
import Loading from "@/components/common/loading";
import ProfileScreen from "@/components/profile/ProfileScreen";
import CustomHeader from "@/components/ui/CustomHeader";
import { useLogout } from "@/hooks/useLogout";
import { useUser } from "@/hooks/useUser";
import { updateUserAvatar } from "@/services/userService";
import { useTheme } from '@/theme/themeContext';
import * as ImagePicker from 'expo-image-picker';
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoScreen from "./info";

type Screen = 'profile' | 'edit' | 'settings' | 'billing' | 'users' | 'info';

export default function ProducerProfile() {
  const { colors } = useTheme();
  const { user, loading: userLoading, refetch } = useUser();
  const { handleLogout, showModal, handleConfirm, handleCancel, isLoggingOut, LogoutModal } = useLogout();
  const [refreshing, setRefreshing] = useState(false);

  const handleBack = () => {
    // From profile tab landing, always go back to dashboard
    router.navigate('/dashboards/(producer)');
  };

  const [avatar, setAvatar] = useState<string | null>(
    user?.photo && user.photo.trim() !== '' ? user.photo : null
  );

  const navigation = useNavigation<any>();

  const [isLoading, setIsLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('profile');

  useEffect(() => {
    if (user?.photo) {
      setAvatar(user.photo.trim() !== '' ? user.photo : null);
    }
  }, [user]);

  useEffect(() => {
    // Reset profile when tab icon is pressed (handles both Stack screens and conditional renders)
    const unsubscribe = navigation.addListener('tabPress' as any, (e: any) => {
      // Only prevent default if we can go back (to allow Stack screens to reset)
      if (navigation.canGoBack()) {
        e.preventDefault();
        navigation.reset({
          index: 0,
          routes: [{ name: 'index' }],
        });
      }
      // Always reset the conditional render state when on profile tab
      if (currentScreen !== 'profile') {
        e.preventDefault();
        setCurrentScreen('profile');
      }
    });
    return unsubscribe;
  }, [navigation, currentScreen]);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'User',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    company: 'Egg Corporate',
  });

  if (userLoading) {
    return <Loading message="Loading profile..." />;
  }

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
      base64: true,
    });

    if (!result.canceled) {
      try {
        console.log("Selected image:", result);
        const asset = result.assets[0];

        if (!asset.base64) {
          throw new Error("Based64 conversion failed");
      }

    const base64Image = `data:image/jpeg;base64,${asset.base64}`;
    setAvatar(asset.uri);

    await updateUserAvatar(base64Image);

    Alert.alert("Success", "Profile picture updated successfully");
    console.log("Profile picture updated successfully");
    } catch (err: any) {
      console.log("Error updating avatar:", err);
      Alert.alert("Error", err.message || "Failed to update profile picture");
      setAvatar(user?.photo || null);
      }
    }
  };

  const handleAction = async (action: string) => {
    if (action === "logout") {
      handleLogout();
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
          <CustomHeader title="Profile" onBackPress={handleBack} />
          <ProfileScreen
            role="producer"
            name={profileData.name}
            email={profileData.email}
            avatarUri={avatar}
            refreshing={refreshing}
            onRefresh={async () => {
              try {
                setRefreshing(true);
                await refetch({ forceRemote: true });
              } finally {
                setRefreshing(false);
              }
            }}
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
      
      <LogoutModal
        visible={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isLoading={isLoggingOut}
      />
    </SafeAreaView>
  );
}