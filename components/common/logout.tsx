import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function LogoutModal({
  visible,
  onConfirm,
  onCancel,
  isLoading = false,
}: Props) {
  const { colors } = useTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View
          className="w-[85%] rounded-2xl p-6"
          style={{ backgroundColor: colors.surface }}
        >
          {/* Icon */}
          <View className="items-center mb-4">
            <View
              className="w-12 h-12 rounded-full items-center justify-center mb-3"
              style={{ backgroundColor: colors.primaryDark }}
            >
              <Ionicons name="log-out-outline" size={24} color={colors.textPrimary} />
            </View>
          </View>

          {/* Title */}
          <Text
            className="text-lg font-bold text-center mb-2"
            style={{ color: colors.textPrimary }}
          >
            Confirm Logout
          </Text>

          {/* Message */}
          <Text
            className="text-sm text-center mb-6"
            style={{ color: colors.textSecondary }}
          >
            Are you sure you want to logout? You'll need to log-in again.
          </Text>

          {/* Buttons */}
          <View className="flex-row gap-3">
            {/* Cancel Button */}
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg items-center justify-center"
              style={{ backgroundColor: colors.border }}
              onPress={onCancel}
              disabled={isLoading}
            >
              <Text
                className="font-semibold text-sm"
                style={{ color: colors.textPrimary }}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg items-center justify-center flex-row gap-2"
              style={{ backgroundColor: colors.primaryDark }}
              onPress={onConfirm}
              disabled={isLoading}
              activeOpacity={0.7}
            >
              {isLoading ? (
                <>
                  <Text
                    className="font-semibold text-sm"
                    style={{ color: colors.surface }}
                  >
                    Logging out...
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons name="log-out-outline" size={16} color={colors.textPrimary} />
                  <Text
                    className="font-semibold text-sm"
                    style={{ color: colors.textPrimary }}
                  >
                    Logout
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
