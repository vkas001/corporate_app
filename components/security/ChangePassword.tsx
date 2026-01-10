import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import CustomInput from "../ui/CustomInput";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // 🔗 Replace with real API call
      await new Promise((res) => setTimeout(res, 1500));

      Alert.alert("Success", "Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      setError("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-semibold mb-4">Change Password</Text>

      {error ? (
        <Text className="text-red-500 mb-3">{error}</Text>
      ) : null}

      <CustomInput
        label="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <CustomInput
        label="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <CustomInput
        label="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        className="mt-6 h-12 rounded-lg bg-blue-600 items-center justify-center disabled:opacity-60"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold">Update Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
