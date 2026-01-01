import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { useTheme } from "@/theme/themeContext";
import { saveAuth } from "@/utils/auth";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const { colors } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "producer",
  });

  const submit = async () => {
    const emailTrimmed = form.email.trim();
    const passwordTrimmed = form.password.trim();

    if (!emailTrimmed || !passwordTrimmed) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (passwordTrimmed.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = {
        token: "fake_jwt_token",
        user: {
          role: form.role,
        },
      };
      const { token, user } = response;
      await saveAuth(token, user.role);

      if (user.role === "producer") {
        router.replace("/dashboards/(producer)");
      } else if (user.role === "seller") {
        router.replace("/dashboards/(seller)");
      } else {
        Alert.alert("Error", "Unknown user role");
      }
    } catch (error) {
      Alert.alert("Error", " Invalid user role");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 px-5 pt-5 "
      style={{
        backgroundColor: colors.background
      }}>
      <LinearGradient className="pt-8 pb-8"
        colors={[colors.primary + "14", colors.surface]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="mb-8 mt-4">
            <Text
              className="text-sm font-semibold tracking-widest text-center"
              style={{ color: colors.textSecondary }}
            >
              WELCOME BACK
            </Text>
            <Text
              className="text-3xl font-extrabold text-center mt-2"
              style={{ color: colors.textPrimary }}
            >
              Sign in to Egg Corporate
            </Text>
            <Text
              className="text-center text-sm mt-2"
              style={{ color: colors.textSecondary }}
            >
              Monitor production, sales, and finances from one place.
            </Text>
          </View>

          <View
            className="rounded-3xl p-5 mb-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1
            }}
          >
            <View className="flex-row justify-between mb-5">
              <View>
                <Text className="text-xs"
                  style={{ color: colors.textSecondary }}
                >
                  Today
                </Text>
                <Text className="text-lg font-bold"
                  style={{ color: colors.textPrimary }}
                >
                  Fresh insights ready.
                </Text>
              </View>
              <View
                className="w-10 h-10 rounded-2xl items-center justify-center"
                style={{ backgroundColor: colors.primary + "1A" }}
              >
                <Ionicons name="lock-closed" size={18} color={colors.primary} />
              </View>
            </View>

            <View className="mb-4">
              <CustomInput
                placeholder="name@company.com"
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-2">
              <CustomInput
                placeholder="••••••••"
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
                label="Password"
                secureTextEntry
              />
            </View>

            <View className="flex-row justify-between items-center mt-2 mb-6">
              <Text className="text-xs"
                style={{ color: colors.textSecondary }}
              >
                Secure login with encrypted session
              </Text>
              <Pressable onPress={() => Alert.alert("Need help?",
                "Contact support to reset your password.")}
              >
                <Text className="text-xs font-semibold"
                  style={{ color: colors.primary }}
                >
                  Forgot?
                </Text>
              </Pressable>
            </View>

            <View className="mb-6">
              <Text className="text-sm mb-3 font-semibold"
                style={{ color: colors.textPrimary }}
              >
                Continue as
              </Text>
              <View className="flex-row gap-3">
                {["producer", "seller"].map((roleOption) => {
                  const isActive = form.role === roleOption;
                  const icon = roleOption === "producer" ? "leaf-outline" : "cart-outline";
                  return (
                    <Pressable
                      key={roleOption}
                      onPress={() => setForm((prev) => ({ ...prev, role: roleOption }))}
                      className="flex-1 border rounded-2xl py-3 px-3"
                      style={{
                        borderColor: isActive ? colors.primary : colors.border,
                        backgroundColor: isActive ? colors.primary + "14" : colors.background,
                      }}
                    >
                      <View className="flex-row items-center justify-center gap-2">
                        <Ionicons
                          name={icon as any}
                          size={16}
                          color={isActive ? colors.primary : colors.textSecondary}
                        />
                        <Text
                          className="text-sm font-semibold"
                          style={{ color: isActive ? colors.primary : colors.textSecondary }}
                        >
                          {roleOption === "producer" ? "Producer" : "Seller"}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />
          </View>

          <View className="items-center mt-3">
            <Text className="text-xs"
              style={{ color: colors.textSecondary }}
            >
              By signing in you agree to our
            </Text>
            <View className="items-center mt-1">
              <Pressable onPress={() => router.push("/dashboards/(modal)/privacy-policy")}>
                <Text className="text-xs font-semibold"
                  style={{ color: colors.primary }}
                >
                  Privacy Policy
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default SignIn;