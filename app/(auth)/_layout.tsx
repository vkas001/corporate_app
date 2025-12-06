import { Redirect, Slot } from "expo-router";
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function AuthLayout() {

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>

      <ScrollView>
        

        <Slot />

      </ScrollView>

    </KeyboardAvoidingView>
  );
}