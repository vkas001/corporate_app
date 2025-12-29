import { marketPrices } from "@/data/marketPrices";
import { useTheme } from "@/theme/themeContext";
import { formatCurrency } from "@/utils/currencyFormatter";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";

const ROW_HEIGHT = 46;

export default function LiveMarket() {
  const { colors } = useTheme();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("eggs");

  const activeCategory = marketPrices.find(
    (cat) => cat.id === selectedId
  );

  return (
    <View className="relative mx-1.5">
      <TouchableOpacity
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
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        <View className="flex-row items-center gap-2 flex-1">
          <View
            className="w-8 h-8 rounded-lg items-center justify-center"
            style={{ backgroundColor: colors.primary + "15" }}
          >
            <Ionicons
              name="pricetag"
              size={18}
              color={colors.primary}
            />
          </View>
          <Text className="text-lg font-bold" style={{ color: colors.textPrimary }}>{activeCategory?.name}</Text>
        </View>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={24}
          color={colors.primaryDark}
        />
      </TouchableOpacity>

      {open && (
        <View
          className="absolute top-16 left-0 right-0 z-10 border rounded-xl overflow-hidden"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
          }}
        >
          {marketPrices
            .filter((cat) => cat.id !== selectedId)
            .map((cat, index) => (
              <TouchableOpacity
                key={cat.id}
                className={`flex-row items-center px-4.5 py-3.5 gap-3 ${index < marketPrices.filter((c) => c.id !== selectedId).length - 1 ? 'border-b' : ''}`}
                style={{ borderBottomColor: colors.border }}
                onPress={() => {
                  setSelectedId(cat.id);
                  setOpen(false);
                }}
                activeOpacity={0.7}
              >
                <View
                  className="w-7 h-7 rounded items-center justify-center"
                  style={{ backgroundColor: colors.background }}
                >
                  <Ionicons
                    name="pricetag-outline"
                    size={16}
                    color={colors.textSecondary}
                  />
                </View>
                <Text className="text-base font-medium" style={{ color: colors.textPrimary }}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      )}
      {activeCategory && (
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
                <Text className="text-xs font-bold uppercase" style={{ color: colors.textPrimary }}>Type</Text>
              </View>

              <FlatList
                data={activeCategory.items}
                keyExtractor={(item, index) => item.type + index}
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
                    <Text className="text-sm font-medium" style={{ color: colors.textPrimary }}>{item.type}</Text>
                  </View>
                )}
                scrollEnabled={false}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View>
                <View className="flex-row">
                  {activeCategory.columns.map((column, colIndex) => (
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
                  data={activeCategory.items}
                  keyExtractor={(item, index) => item.type + index}
                  renderItem={({ item, index }) => (
                    <View className="flex-row">
                      {item.prices.map((priceCell, priceIndex) => (
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
                          <Text className="text-base font-semibold" style={{ color: colors.primary }}>
                            {formatCurrency(priceCell.price)}
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
