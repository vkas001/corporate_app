import CustomButton from "@/components/Buttons/CustomButton";
import LiveMarketCategory from "@/components/LivePrice/MarketCategory";
import { useTheme } from "@/theme";
import { ColorTheme } from "@/theme/colorTheme";
import { getRole, getToken } from "@/utils/auth";
import { formatFullDate } from "@/utils/dateFormatter";
import { Redirect, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LandingPage() {
 return <Redirect href="./dashboards/(seller)" />;
  const { colors } = useTheme();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      const saveRole = await getRole(); 

      if (!token || !saveRole) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setRole(saveRole);
      setIsAuthenticated(true);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return null; // or a loading spinner
  }

  if (isAuthenticated === false) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  const submit = async () => {
    setIsSubmitting(true);

    const token = await getToken();
    const role = await getRole();

    if (!token || !role) {
      router.replace("/(auth)/sign-in");
      setIsSubmitting(false);
      return;
    }

    if (role === "producer") {
      router.replace("/dashboards/(producer)");
    } else if (role === "seller") {
      router.replace("./dashboards/(seller)/dashboard");
    } else {
      router.replace("/(auth)/sign-in");
    }
    setIsSubmitting(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView >

        <View style={styles(colors).headerContainer}>
          <View>
            <Text style={styles(colors).headerTitle}>
              Live Market Prices
            </Text>
            <Text style={styles(colors).dateText}>{formatFullDate(new Date())}</Text>
          </View>

          <CustomButton
            title="Continue"
            size="small"
            isLoading={isSubmitting}
            onPress={submit}
          />
        </View>

        <View style={styles(colors).categoryContainer}>
          <Text style={styles(colors).categoryTitle}>
            Category
          </Text>
          <View>
            <LiveMarketCategory />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = (colors: ColorTheme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.surface,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.textPrimary,
    },
    dateText: {
      fontSize: 10,
      paddingHorizontal: 16,
      color: colors.textSecondary,
    },
    categoryContainer: {
      paddingTop: 8,
    },
    categoryTitle: {
      fontSize: 18,
      fontWeight: "600",
      paddingHorizontal: 16,
      color: colors.textPrimary,
    },

  });
