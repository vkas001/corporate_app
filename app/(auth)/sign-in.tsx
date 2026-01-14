import Loading from "@/components/common/loading";
import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { useTheme } from "@/theme/themeContext";
import { normalizeRole, saveAuth, seedDevAuth } from "@/utils/auth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";

const SignIn = () => {
  const { colors } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    console.log(" Sign In button pressed");
    const emailTrimmed = form.email.trim();
    const passwordTrimmed = form.password.trim();
    console.log(" Email:", emailTrimmed);

    if (!emailTrimmed || !passwordTrimmed) {
      console.log(" Validation failed: Empty fields");
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      console.log(" Validation failed: Invalid email format");
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (passwordTrimmed.length < 6) {
      console.log(" Validation failed: Password too short");
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log(" Sending login request...");
      const res = await fetch("https://eggadmin.aanshtech.com.np/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailTrimmed,
          password: passwordTrimmed,
        }),
      });

      console.log(" Response status:", res.status);
      const data = await res.json();
      console.log(" Response data:", data);

      if (!res.ok) {
        Alert.alert("Login Failed", data.message || "Unauthorized");
        return;
      }

      const { token, roles, permissions, user } = data;
      console.log(" Login successful");
      console.log(" User:", user);
      console.log(" Roles:", roles);
      console.log(" Roles type:", typeof roles, "Is array:", Array.isArray(roles));
      console.log(" Roles JSON:", JSON.stringify(roles));
      console.log(" First role if exists:", roles?.[0]);

      await saveAuth(token, roles, permissions, user);
      console.log(" Auth saved to storage");

      const normalizedRoles = Array.isArray(roles) ? roles.map(normalizeRole) : [];
      const hasRole = (roleName: string) => normalizedRoles.includes(normalizeRole(roleName));

      console.log(" Checking Super Admin:", hasRole("Super Admin"));
      console.log(" Checking Producer:", hasRole("Producer"));
      console.log(" Checking Seller:", hasRole("Seller"));

      if (hasRole("Super Admin")) {
        console.log(" Redirecting to SuperAdmin dashboard");
        router.replace("/dashboards/(superAdmin)");
      } else if (hasRole("Producer")) {
        console.log(" Redirecting to Producer dashboard");
        router.replace("/dashboards/(producer)");
      } else if (hasRole("Seller")) {

        console.log(" Redirecting to Seller dashboard");
        router.replace("/dashboards/(seller)");
      } else {
        console.log(" Redirecting to Auth");
        router.replace("/(auth)/sign-in");
      }
    } catch (err: any) {
      console.error(" Login error:", err);
      Alert.alert("Login Failed", err.message || "Unauthorized");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
        <ScrollView
          className="flex-1 px-6 pt-12"
          style={{ backgroundColor: colors.background }}
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
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text) => setForm((prev) =>
                  ({ ...prev, password: text }))}
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

            <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />

            {__DEV__ && (
              <View className="mt-3">
                <Pressable
                  onPress={async () => {
                    try {
                      setIsSubmitting(true);
                      await seedDevAuth({
                        roles: ["Super Admin"],
                        user: {
                          id: 1,
                          email: "superadmin@eggadmin.com",
                          name: null,
                          roles: ["Super Admin"],
                          permissions: [],
                          status: false,
                          photo: null,
                          phone: null,
                          address: null,
                        },
                      });
                      router.replace("/dashboards/(superAdmin)");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                >
                  <Text
                    className="text-xs font-semibold text-center"
                    style={{ color: colors.primary }}
                  >
                    Dev: Continue as Super Admin
                  </Text>
                </Pressable>
              </View>
            )}
          </View>

          <View className="items-center mt-3">
            <Text className="text-xs"
              style={{ color: colors.textSecondary }}
            >
              By signing in you agree to our
            </Text>
            <View className="items-center mt-1">
                <Pressable onPress={() => router.push("/dashboards/legal/privacy-policy")}>
                <Text className="text-xs font-semibold"
                  style={{ color: colors.primary }}
                >
                  Privacy Policy
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

      {isSubmitting && (
        <View
          className="absolute inset-0 items-center justify-center"
          style={{ backgroundColor: colors.background + "E6" }}
        >
          <Loading message="Signing you in..." fullscreen={false} />
        </View>
      )}
    </>
  );
};

export default SignIn;