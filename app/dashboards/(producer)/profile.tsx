import ThemeToggle from "@/components/ThemeToggle";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "../../../theme";


export default function ProducerProfile() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[
          { paddingHorizontal: 16, paddingTop: 20 },
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 120, 
          },
        ]}
      >
        <Text
          style={{
            color: colors.primary,
            fontSize: 21,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Welcome to Producer Profile
        </Text>

          <ThemeToggle />

      </ScrollView>
    </View>
  );
}
