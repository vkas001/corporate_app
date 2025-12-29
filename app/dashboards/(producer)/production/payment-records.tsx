import PaymentCard from '@/components/Payment/paymentCard';
import CustomHeader from '@/components/Screens/CustomHeader';
import { producerPayments } from '@/data/payments';
import { useTheme } from '@/theme/themeContext';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentRecords() {
  const{ colors } = useTheme();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Payment Records" />
      { producerPayments.map(payment => (
        <PaymentCard 
          key={payment.id}
          payment={payment}
        />
      ))}
    </SafeAreaView>
  )
}