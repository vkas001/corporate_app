import { useMarket } from "@/hooks/useMarket";
import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

const ROW_HEIGHT = 46;
const PRICE_COLUMNS = ["Per Piece", "Per Crate", "Per Carton"];

export default function LiveMarket() {
  const { colors } = useTheme();
  const { eggTypes, loading } = useMarket();
  const hasEggTypes = eggTypes.length > 0;

  return (
    <View className="relative mx-1.5">
      <View
        className="px-4 py-3 rounded-xl flex-row items-center justify-between border"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.primary,
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        }}
      >
        <View className="flex-row items-center gap-2 flex-1">
          <View
            className="w-8 h-8 rounded-lg items-center justify-center"
            style={{ backgroundColor: colors.primary + "15" }}
          >
            <Ionicons
              name="egg-outline"
              size={18}
              color={colors.primary}
            />
          </View>
          <Text className="text-lg font-bold"
            style={{ color: colors.textPrimary }}>Egg Types
          </Text>
        </View>
      </View>

      {loading && !hasEggTypes ? (
        <View
          className="mt-4 border rounded-xl p-6 items-center"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <Text className="text-sm" style={{ color: colors.textSecondary }}>
            Loading egg types...
          </Text>
        </View>
      ) : !hasEggTypes ? (
        <View
          className="mt-4 border rounded-xl p-6 items-center"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <Ionicons name="egg-outline" size={36} color={colors.textSecondary} />
          <Text className="text-sm mt-2" style={{ color: colors.textSecondary }}>
            No egg types available yet.
          </Text>
        </View>
      ) : (
        <View
          className="mt-4 border rounded-xl overflow-hidden"
          style={{
            borderColor: colors.border,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          }}
        >
          <View className="flex-row">
            <View>
              <View
                className="items-center justify-center border-r border-b flex-row"
                style={{
                  width: 110,
                  height: ROW_HEIGHT,
                  backgroundColor: colors.primaryDark,
                  borderRightColor: colors.border,
                  borderBottomColor: colors.border,
                }}
              >
                <Ionicons name="list" size={14} color={colors.textPrimary} className="mr-1.5" />
                <Text className="text-xs font-bold uppercase"
                  style={{ color: colors.textPrimary }}>Type
                </Text>
              </View>

              <FlatList
                data={eggTypes}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <View
                    className="items-center justify-center border-r border-b"
                    style={{
                      width: 110,
                      height: ROW_HEIGHT,
                      backgroundColor: index % 2 === 0 ? colors.surface : colors.background,
                      borderRightColor: colors.border,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <Text className="text-sm font-medium"
                      style={{ color: colors.textPrimary }}>{item.name}
                    </Text>
                  </View>
                )}
                scrollEnabled={false}
              />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View className="flex-row">
                  {PRICE_COLUMNS.map((column, colIndex) => (
                    <View
                      key={colIndex}
                      className="items-center justify-center border-r border-b flex-row"
                      style={{
                        width: 140,
                        height: ROW_HEIGHT,
                        backgroundColor: colors.primaryDark,
                        borderRightColor: colors.border,
                        borderBottomColor: colors.border,
                      }}
                    >
                      <Text className="text-xs font-bold uppercase" style={{ color: colors.textPrimary }}>{column}</Text>
                    </View>
                  ))}
                </View>
                <FlatList
                  data={eggTypes}
                  keyExtractor={(item) => item.id}
                  renderItem={({ index }) => (
                    <View className="flex-row">
                      {PRICE_COLUMNS.map((_, priceIndex) => (
                        <View
                          key={priceIndex}
                          className="items-center justify-center border-r border-b"
                          style={{
                            width: 140,
                            height: ROW_HEIGHT,
                            backgroundColor: index % 2 === 0 ? colors.surface : colors.background,
                            borderRightColor: colors.border,
                            borderBottomColor: colors.border,
                          }}
                        >
                          <Text className="text-base font-semibold"
                            style={{ color: colors.textSecondary }}>
                            —
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                  scrollEnabled={false}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      )}

    </View>
  );
}
