import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, TextInput, View } from "react-native";

import { useTheme } from "@/theme/themeContext";

type Props = {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  dateFilter: string;
  onDateFilterChange: (value: string) => void;
  searchPlaceholder?: string;
  datePlaceholder?: string;
};

export default function HistorySearchDateFilter({
  searchQuery,
  onSearchQueryChange,
  dateFilter,
  onDateFilterChange,
  searchPlaceholder = "Search records...",
  datePlaceholder = "YYYY-MM-DD",
}: Props) {
  const { colors } = useTheme();

  return (
    <View>
      {/* Search */}
      <View
        className="flex-row items-center px-4 rounded-2xl mb-3 border"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
        <TextInput
          className="flex-1 ml-2"
          placeholder={searchPlaceholder}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={onSearchQueryChange}
          style={{ color: colors.textPrimary }}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => onSearchQueryChange("")}
            hitSlop={8}
          >
            <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
          </Pressable>
        )}
      </View>

      {/* Date */}
      <View
        className="flex-row items-center px-4 rounded-2xl mb-3 border"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
        <TextInput
          className="flex-1 ml-2"
          placeholder={datePlaceholder}
          placeholderTextColor={colors.textSecondary}
          value={dateFilter}
          onChangeText={onDateFilterChange}
          style={{ color: colors.textPrimary }}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numbers-and-punctuation"
        />
        {dateFilter.length > 0 && (
          <Pressable onPress={() => onDateFilterChange("")}
            hitSlop={8}
          >
            <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
          </Pressable>
        )}
      </View>
    </View>
  );
}
