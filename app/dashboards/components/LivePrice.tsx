import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTheme } from "@/theme/themeContext";

type PriceItem = {
  type: string;
  price: number;
};

interface PriceProps {
  prices: PriceItem[];
}

export default function LivePrice({ prices }: PriceProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        height: 28,              // fixed height so it doesn't stretch the layout
        justifyContent: "center",
        overflow: "hidden",      
        marginBottom: 10,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: 8,
        }}
      >
        {prices.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 18,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginRight: 6,
                color: colors.textPrimary,
              }}
            >
              {item.type}:
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: colors.primary,
              }}
            >
              Rs. {item.price}
            </Text>

            {index !== prices.length - 1 && (
              <Text
                style={{
                  fontSize: 14,
                  marginHorizontal: 12,
                  color: colors.textSecondary,
                }}
              >
                |
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
