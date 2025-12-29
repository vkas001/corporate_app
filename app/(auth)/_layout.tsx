import { Slot } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

export default function AuthLayout() {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >

      <ScrollView>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}