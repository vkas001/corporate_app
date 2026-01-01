import { Slot } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function AuthLayout() {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <Slot />
    </KeyboardAvoidingView>
  );
}