import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../theme";
import LivePrice from "../components/LivePrice";
import { createDashboardStyles } from "../style/dashboardStyleSheet";


export default function ProducerDashboard() {
  const { colors } = useTheme();
  const styles = createDashboardStyles(colors);


  const prices = [
    { type: "Chicken Egg", price: 12.5 },
    { type: "Duck Egg", price: 18.0 },
    { type: "Quail Egg", price: 25.0 },
    { type: "Local Egg", price: 15.7 },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "np" : "en";
    i18n.changeLanguage(newLang);
  };

  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>

        <View style={styles.priceCard}>

          <Text style={styles.priceLabel}>Live Price</Text>

          <LivePrice prices={prices} />

        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Welcome Producer!
          </Text>

          <View style={styles.langBtnsContainer}>
            <TouchableOpacity
              style={[
                styles.langBtn,
                i18n.language === "en" && styles.langBtnActive,
              ]}
              onPress={() => i18n.changeLanguage("en")}
            >
              <Text style={styles.langText}>EN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.langBtn,
                i18n.language === "np" && styles.langBtnActive,
              ]}
              onPress={() => i18n.changeLanguage("np")}
            >
              <Text style={styles.langText}>NP</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Chicken's</Text>
            <Text style={styles.cardValue}>10,000</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Eggs</Text>
            <Text style={styles.cardValue}>3000</Text>
          </View>
        </View>


        <Text style={styles.sectionTitle}>Info</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Total Chick's</Text>
          <Text style={[styles.infoText, { color: "red" }]}>2000</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Today' Eggs Sold</Text>
          <Text style={[styles.infoText, { color: "red" }]}>1000</Text>
        </View>

        <Text style={styles.sectionTitle}>Today's Stats</Text>
        <View style={styles.marketPanel}>
          <View style={styles.marketRow}>
            <Text style={styles.marketLabel}>Egg Production</Text>
            <Text style={styles.marketValue}>3200</Text>
          </View>

          <View style={styles.marketRow}>
            <Text style={styles.marketLabel}>Eggs Sold</Text>
            <Text style={styles.marketValue}>1000</Text>
          </View>

          <View style={styles.marketRow}>
            <Text style={styles.marketLabel}>Mortality</Text>
            <Text style={[styles.marketValue, { color: "red" }]}>12</Text>
          </View>

          <View style={styles.marketRow}>
            <Text style={styles.marketLabel}>Today's Revenue</Text>
            <Text style={[styles.marketValue, { color: colors.primary }]}>Rs. 12,500</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
