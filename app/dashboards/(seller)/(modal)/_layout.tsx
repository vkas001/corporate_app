import { Stack } from "expo-router";

export default function ProductionLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{ headerShown: false }}
        
    />
  );
}
