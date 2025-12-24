import CustomButton from "@/components/Buttons/CustomButton";
import CustomInput from "@/components/Buttons/CustomInput";
import { useTheme } from "@/theme/themeContext";
import { saveAuth } from "@/utils/auth";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

const SignIn = () => {
  const { colors } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    const emailTrimmed = form.email.trim();
    const passwordTrimmed = form.password.trim();

    if (!emailTrimmed || !passwordTrimmed) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = {
        token: "fake_jwt_token",
        user: {
          role: "producer",
        },
      };
      const {token, user} = response;
      await saveAuth(token, user.role);

      if (user.role === "producer") {
        router.replace("./(producer)/dashboard");
      }else if (user.role === "seller") {
        router.replace("./(seller)/dashboard");
      } else {
        Alert.alert("Error", "Unknown user role");
      }
    }catch (error) {
      Alert.alert("Error", " Invalid user role");
    } finally {
      setIsSubmitting(false);
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

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert("Success", "Account created successfully", [
        { text: "OK", onPress: () => router.replace("/sign-in") },
      ]);
    }, 1000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: colors.primary }]}>Egg-Corporate</Text>

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

        <CustomButton
          title="Sign In"
          isLoading={isSubmitting}
          onPress={submit}
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 50, 
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 40,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  signInText: {
    fontSize: 14,
  },
  signInLink: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 6,
  },
});

export default SignIn;