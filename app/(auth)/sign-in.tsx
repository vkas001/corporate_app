import CustomButton from "@/components/Buttons/CustomButton";
import CustomInput from "@/components/Buttons/CustomInput";
import { useTheme } from "@/theme/themeContext";
import { saveAuth } from "@/utils/auth";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
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
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-8"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <View className="mb-10">
          <Text
            className="text-4xl font-bold text-center mb-2"
            style={{ color: colors.primary }}
          >
            Egg-Corporate
          </Text>
          <Text
            className="text-center text-sm"
            style={{ color: colors.textSecondary }}
          >
            Sign in to your account
          </Text>
        </View>

        <CustomInput
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomInput
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
          label="Password"
          secureTextEntry
        />

        <View className="mb-8 mt-8">
          <Text
            className="text-sm mb-3"
            style={{ color: colors.textSecondary }}
          >
            Select role
          </Text>
          <View className="flex-row gap-3">
            {["producer", "seller"].map((roleOption) => {
              const isActive = form.role === roleOption;
              return (
                <Pressable
                  key={roleOption}
                  onPress={() => setForm((prev) => ({ ...prev, role: roleOption }))}
                  className="flex-1 border rounded-lg py-3 items-center"
                  style={{
                    borderColor: isActive ? colors.primary : colors.border,
                    backgroundColor: isActive
                      ? colors.primary + "1A"
                      : colors.surface,
                  }}
                >
                  <Text
                    className="text-base font-semibold"
                    style={{
                      color: isActive ? colors.primary : colors.textSecondary,
                    }}
                  >
                    {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <CustomButton
          title="Sign In"
          isLoading={isSubmitting}
          onPress={submit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;