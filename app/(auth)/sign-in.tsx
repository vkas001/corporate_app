import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useTheme } from "@/theme/themeContext";
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

        <View style={styles.signInContainer}>
          <Text style={[styles.signInText, { color: colors.textSecondary }]}>
            Don't have an account?
          </Text>
          <Link
            href="/sign-up"
            style={[styles.signInLink, { color: colors.primary }]}
          >
            Sign Up
          </Link>
        </View>
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
    paddingVertical: 50, // Give top/bottom spacing
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