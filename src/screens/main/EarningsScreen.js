import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEarnings } from '../../hooks/useEarnings';

export default function EarningsScreen() {
  const { todayStats, currentBalance } = useEarnings([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ganancias</Text>
      <Text style={styles.balance}>Saldo disponible: ${currentBalance} COP</Text>
      <Text>Viajes hoy: {todayStats.tripsCount}</Text>
      <Text>Ganancia neta hoy: ${todayStats.netEarnings} COP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  balance: { fontSize: 18, fontWeight: 'bold', color: '#28a745', marginBottom: 15 }
});