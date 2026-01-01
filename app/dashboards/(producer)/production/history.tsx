import HistoryCard from "@/components/history/HistoryCard";
import CustomHeader from "@/components/ui/CustomHeader";
import { useHistory } from "@/hooks/useHistory";
import { useTheme } from "@/theme/themeContext";
import { groupByDate } from "@/utils/groupbyDate";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Category = 'all' | 'production' | 'mortality' | 'batch' | 'feed' | 'payment';

const CATEGORIES: { label: string; value: Category; icon: string }[] = [
  { label: 'All', value: 'all', icon: 'apps-outline' },
  { label: 'Production', value: 'production', icon: 'document-text-outline' },
  { label: 'Mortality', value: 'mortality', icon: 'alert-circle-outline' },
  { label: 'Batch', value: 'batch', icon: 'cube-outline' },
  { label: 'Feed', value: 'feed', icon: 'nutrition-outline' },
  { label: 'Payment', value: 'payment', icon: 'card-outline' },
];

export default function HistoryScreen() {
  const { colors } = useTheme();
  const role: "producer" | "seller" = "producer";
  const { history } = useHistory(role);
  
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
      const matchesSearch = !searchQuery || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDate = !dateFilter || item.date?.includes(dateFilter);
      
      return matchesCategory && matchesSearch && matchesDate;
    });
  }, [history, selectedCategory, searchQuery, dateFilter]);

  const grouped = groupByDate(filteredHistory);

  return (
    <SafeAreaView className="flex-1" 
      style={{ backgroundColor: colors.background }}
    >
      <CustomHeader title="History" />
      
      <View className="px-4">
        {/* Search Bar */}
        <View 
          className="flex-row items-center px-4 py-3 rounded-2xl mb-3 border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
          <TextInput
            className="flex-1 ml-2"
            placeholder="Search records..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ color: colors.textPrimary }}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </Pressable>
          )}
        </View>

        {/* Date Filter */}
        <View 
          className="flex-row items-center px-4 py-3 rounded-2xl mb-3 border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
          <TextInput
            className="flex-1 ml-2"
            placeholder="Filter by date (YYYY-MM-DD)"
            placeholderTextColor={colors.textSecondary}
            value={dateFilter}
            onChangeText={setDateFilter}
            style={{ color: colors.textPrimary }}
          />
          {dateFilter.length > 0 && (
            <Pressable onPress={() => setDateFilter('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </Pressable>
          )}
        </View>

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <View className="flex-row gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <Pressable
                  key={cat.value}
                  onPress={() => setSelectedCategory(cat.value)}
                  className="px-4 py-2.5 rounded-full border flex-row items-center gap-2"
                  style={{
                    backgroundColor: isActive ? colors.primary : colors.surface,
                    borderColor: isActive ? colors.primary : colors.border,
                  }}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={16}
                    color={isActive ? colors.surface : colors.textPrimary}
                  />
                  <Text
                    className="text-sm font-semibold"
                    style={{ color: isActive ? colors.surface : colors.textPrimary }}
                  >
                    {cat.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Results Count */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-sm font-semibold" style={{ color: colors.textSecondary }}>
            {filteredHistory.length} {filteredHistory.length === 1 ? 'record' : 'records'}
          </Text>
          {(searchQuery || dateFilter || selectedCategory !== 'all') && (
            <Pressable
              onPress={() => {
                setSearchQuery('');
                setDateFilter('');
                setSelectedCategory('all');
              }}
              className="flex-row items-center gap-1"
            >
              <Ionicons name="refresh-outline" size={14} color={colors.primary} />
              <Text className="text-xs font-semibold" style={{ color: colors.primary }}>
                Clear filters
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {Object.keys(grouped).length === 0 && (
          <View className="items-center justify-center py-12">
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: colors.primary + '14' }}
            >
              <Ionicons name="time-outline" size={40} color={colors.primary} />
            </View>
            <Text className="text-base font-semibold mb-2" style={{ color: colors.textPrimary }}>
              No records found
            </Text>
            <Text className="text-sm text-center" style={{ color: colors.textSecondary }}>
              {searchQuery || dateFilter || selectedCategory !== 'all'
                ? 'Try adjusting your filters'
                : 'No history records available.'}
            </Text>
          </View>
        )}

        {Object.entries(grouped).map(([date, items]) => (
          <View key={date} className="mb-5">
            <View 
              className="flex-row items-center gap-2 mb-3 px-3 py-2 rounded-lg"
              style={{ backgroundColor: colors.surface }}
            >
              <Ionicons name="calendar" size={14} color={colors.primary} />
              <Text
                className="font-bold text-sm"
                style={{ color: colors.textPrimary }}
              >
                {date}
              </Text>
              <View 
                className="ml-auto px-2 py-0.5 rounded-full"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Text className="text-xs font-semibold" style={{ color: colors.primary }}>
                  {items.length}
                </Text>
              </View>
            </View>

            {items.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
