import { View, Text, TouchableOpacity, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { marketPrices } from "@/data/marketPrices";
import { useTheme } from "@/theme/themeContext";
import { createMarketStyles } from "./marketStyleSheet";
import { formatCurrency } from "@/utils/currencyFormatter";

const ROW_HEIGHT = 46;

export default function LiveMarket() {
  const { colors } = useTheme();
  const styles = createMarketStyles(colors);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("eggs");

  const activeCategory = marketPrices.find(
    (cat) => cat.id === selectedId
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setOpen(!open)}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>{activeCategory?.name}</Text>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={22}
          color={colors.textPrimary}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          {marketPrices
            .filter((cat) => cat.id !== selectedId)
            .map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedId(cat.id);
                  setOpen(false);
                }}
              >
                <Text style={styles.dropdownText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      )}
      {activeCategory && (
        <View style={styles.tableWrapper}>
          <View style={{ flexDirection: "row" }}>

            <View>
              <View
                style={[
                  styles.cell,
                  {
                    minWidth: 80,
                    paddingHorizontal: 8,
                    height: ROW_HEIGHT,
                    backgroundColor: colors.primaryDark,
                  },
                ]}
              >
                <Text style={styles.headerText}>Type</Text>
              </View>

              <FlatList
                data={activeCategory.items}
                keyExtractor={(item, index) => item.type + index}
                renderItem={({ item }) => (
                  <View
                    style={[
                      styles.cell,
                      {
                        minWidth: 80,
                        paddingHorizontal: 8,
                        height: ROW_HEIGHT,
                        backgroundColor: colors.surface,
                      },
                    ]}
                  >
                    <Text style={styles.text}>{item.type}</Text>
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
                <View style={{ flexDirection: "row" }}>
                  {activeCategory.columns.map((column, colIndex) => (
                    <View
                      key={colIndex}
                      style={[
                        styles.cell,
                        {
                          minWidth: 110,
                          paddingHorizontal: 8,
                          height: ROW_HEIGHT,
                          backgroundColor: colors.primaryDark
                        },
                      ]}
                    >
                      <Text style={styles.headerText}>{column}</Text>
                    </View>
                  ))}
                </View>
                <FlatList
                  data={activeCategory.items}
                  keyExtractor={(item, index) => item.type + index}
                  renderItem={({ item }) => (
                    <View style={{ flexDirection: "row" }}>
                      {item.prices.map((priceCell, priceIndex) => (
                        <View
                          key={priceIndex}
                          style={[
                            styles.cell,
                            {
                              minWidth: 110,
                              paddingHorizontal: 8,
                              height: ROW_HEIGHT,
                              backgroundColor: colors.textSecondary + "10",
                            },
                          ]}
                        >
                          <Text style={styles.text}>
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
