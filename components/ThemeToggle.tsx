import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/themeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={[
        styles.button,
        { backgroundColor: colors.primary, borderColor: colors.accent },
      ]}
    >
      <Text style={{ color: colors.textPrimary, fontWeight: "600" }}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
});
