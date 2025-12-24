import { createFinanceStyles } from "@/components/Finance/financeStyleSheet";
import { DASHBOARD_DATA } from "@/data/producer/dashboardData";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";


interface Props {
    data: typeof DASHBOARD_DATA.today.financeOverview;
}


export default function FinanceOverview({ data }: Props) {
    const { colors } = useTheme();
    const styles = createFinanceStyles(colors);


    return (
        <View style={styles.sectionGap}>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Ionicons name="trending-up-outline" size={18} color={"green"} />
                    <Text style={styles.cardTitle}>Cash Flow</Text>
                </View>


                <View style={styles.rowBetween}>
                    <View>
                        <Text style={styles.label}>Inflow</Text>
                        <Text style={styles.successText}>{data.cashFlow.inflow}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Outflow</Text>
                        <Text style={styles.errorText}>{data.cashFlow.outflow}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Free Cash</Text>
                        <Text style={styles.valueText}>{data.cashFlow.freeCash}</Text>
                    </View>
                </View>
            </View>


            {/* Cash & Bank + Debts */}
            <View style={styles.rowBetween}>
                <View style={[styles.card, styles.halfCard]}>
                    <Text style={styles.cardTitle}>Cash & Bank</Text>
                    <Text style={styles.bigValue}>{data.cashBank}</Text>
                </View>


                <View style={[styles.card, styles.halfCard]}>
                    <Text style={styles.cardTitle}>Debts</Text>
                    <Text style={styles.successText}>Receivables {data.debts.receivables}</Text>
                    <Text style={styles.errorText}>Payables {data.debts.payables}</Text>
                </View>
            </View>


            {/* Stock */}
            <View style={styles.card}>
                <View style={styles.rowBetween}>
                    <View>
                        <Text style={styles.cardTitle}>Stock</Text>
                        <Text style={styles.bigValue}>{data.stock.value}</Text>
                        {data.stock.criticalItems.length > 0 && (
                            <>
                                <Text style={styles.warningText}>⚠ Critical Items</Text>
                                <Text style={styles.subText}>
                                    {data.stock.criticalItems.join(", ")}
                                </Text>
                            </>
                        )}
                    </View>
                    <Text style={styles.subText}>{data.stock.daysOfSupply} days of supply</Text>
                </View>
            </View>


            {/* Alerts */}
            <View style={styles.card}>
                <Text style={styles.alertTitle}>● Alerts</Text>
                {data.alerts.map((alert: string, index) => (
                    <Text key={index} style={styles.alertText}>
                        {alert}
                    </Text>
                ))}
            </View>
        </View>
    );
}