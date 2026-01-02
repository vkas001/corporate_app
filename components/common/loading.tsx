import { useTheme } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";

interface LoadingProps {
  message?: string;
  fullscreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  message = "Preparing your dashboard...",
  fullscreen = true,
}) => {
  const { colors } = useTheme();

  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinLoop = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 650,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 0,
          duration: 650,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    spinLoop.start();
    pulseLoop.start();

    return () => {
      spinLoop.stop();
      pulseLoop.stop();
      spinValue.stopAnimation();
      pulseValue.stopAnimation();
    };
  }, [pulseValue, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const scale = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1.05],
  });

  return (
    <View
      className={`items-center justify-center ${fullscreen ? "flex-1" : ""}`}
      style={{ backgroundColor: fullscreen ? colors.background : "transparent" }}
    >
      <Animated.View
        className="w-24 h-24 rounded-full items-center justify-center"
        style={{ transform: [{ rotate: spin }, { scale }] }}
      >
        <LinearGradient
          colors={[colors.primary, colors.accent, colors.primaryDark]}
          start={{ x: 0.15, y: 0.1 }}
          end={{ x: 0.9, y: 0.85 }}
          style={{ width: "100%", height: "100%", borderRadius: 9999, padding: 6 }}
        >
          <View
            className="flex-1 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.surface, shadowColor: colors.primaryDark }}
          >
            <View className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.primary }} />
          </View>
        </LinearGradient>
      </Animated.View>

      <Text className="mt-6 text-base font-semibold" style={{ color: colors.textPrimary }}>
        {message}
      </Text>
      <Text className="mt-2 text-xs" style={{ color: colors.textSecondary }}>
        This won&apos;t take long.
      </Text>
    </View>
  );
};

export default Loading;
