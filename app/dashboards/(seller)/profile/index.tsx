import BillingScreen from "@/app/dashboards/(seller)/profile/billings";
import EditProfileScreen from "@/app/dashboards/(seller)/profile/edit";
import SettingsScreen from "@/app/dashboards/(seller)/profile/settings";
import UserManagementScreen from "@/app/dashboards/(seller)/profile/users";
import ProfileScreen from "@/components/profile/ProfileScreen";
import CustomHeader from "@/components/ui/CustomHeader";
import { useLogout } from "@/hooks/useLogout";
import { useUser } from "@/hooks/useUser";
import { updateUserAvatar } from "@/services/userService";
import { useTheme } from '@/theme/themeContext';
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoScreen from "./info";

type Screen = 'profile' | 'edit' | 'settings' | 'billing' | 'users' | 'info';

export default function SellerProfile() {
  const { colors } = useTheme();
  const { user, loading, error, refetch } = useUser();
  const { handleLogout, showModal, handleConfirm, handleCancel, isLoggingOut, LogoutModal } = useLogout();
  const [refreshing, setRefreshing] = useState(false);

  const handleBack = () => {
    // From profile tab landing, always go back to dashboard
    router.navigate('/dashboards/(seller)');
  };

  const [avatar, setAvatar] = useState<string | null>(
    user?.photo && user.photo.trim() !== '' ? user.photo : null
  );
  const [currentScreen, setCurrentScreen] = useState<Screen>('profile');

  useEffect(() => {
    if (user?.photo) {
      setAvatar(user.photo.trim() !== '' ? user.photo : null);
    }
  }, [user]);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'User',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
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
      try {
        const imagePath = result.assets[0].uri;
        setAvatar(imagePath);
        
        // Upload to backend
        const updatedUser = await updateUserAvatar(imagePath);
        Alert.alert("Success", "Avatar updated successfully");
      } catch (err: any) {
        Alert.alert("Error", err.message || "Failed to update avatar");
        setAvatar(user?.photo || null); // Revert to previous avatar
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
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CustomHeader title="Profile" onBackPress={handleBack} />
        </View>
      ) : (
        <>
          {currentScreen === 'profile' && (
            <>
              <CustomHeader title="Profile" onBackPress={handleBack} />
              <ProfileScreen
                role={user?.role || "seller"}
                name={user?.name || 'User'}
                email={user?.email || ''}
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
        </>
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