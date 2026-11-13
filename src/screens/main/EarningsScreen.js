import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useEarnings } from '../../hooks/useEarnings';

const SAMPLE_COMPLETED_TRIPS = [
  {
    id: '101',
    createdAt: new Date().toISOString(),
    fare: 19200,
    commission: 3840,
    driverEarnings: 15360,
    paymentMethod: 'mercadopago',
    paymentStatus: 'paid',
  },
  {
    id: '102',
    createdAt: new Date().toISOString(),
    fare: 12500,
    commission: 2500,
    driverEarnings: 10000,
    paymentMethod: 'cash',
    paymentStatus: 'paid',
  },
];

export default function EarningsScreen() {
  const { todayStats, periodStats, currentBalance, canWithdraw, withdrawAmount } = useEarnings(SAMPLE_COMPLETED_TRIPS);

  const handleWithdraw = () => {
    const amount = withdrawAmount(currentBalance);
    Alert.alert('Retiro solicitado', `Se ha iniciado el retiro de $${amount} COP a tu cuenta vinculada.`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Saldo disponible para retiro</Text>
        <Text style={styles.balanceValue}>${currentBalance.toLocaleString()} COP</Text>
        <TouchableOpacity
          style={[styles.withdrawBtn, !canWithdraw && styles.disabledBtn]}
          disabled={!canWithdraw}
          onPress={handleWithdraw}
        >
          <Text style={styles.withdrawText}>Solicitar Retiro (Mín. $10.000)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.sectionTitle}>Resumen de Hoy</Text>
        <Text style={styles.statRow}>Viajes completados: {todayStats.tripsCount}</Text>
        <Text style={styles.statRow}>Total bruto: ${todayStats.grossTotal.toLocaleString()} COP</Text>
        <Text style={styles.statRow}>Comisión plataforma (20%): -${todayStats.commissionTotal.toLocaleString()} COP</Text>
        <Text style={styles.netRow}>Ganancia neta hoy: ${todayStats.netEarnings.toLocaleString()} COP</Text>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.sectionTitle}>Acumulado Histórico</Text>
        <Text style={styles.statRow}>Total carreras: {periodStats.tripsCount}</Text>
        <Text style={styles.netRow}>Ganancia neta total: ${periodStats.netEarnings.toLocaleString()} COP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  balanceCard: { backgroundColor: '#000', padding: 20, borderRadius: 12, marginBottom: 16 },
  balanceLabel: { color: '#bbb', fontSize: 14 },
  balanceValue: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginVertical: 8 },
  withdrawBtn: { backgroundColor: '#28a745', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
  disabledBtn: { backgroundColor: '#555' },
  withdrawText: { color: '#fff', fontWeight: 'bold' },
  statsCard: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  statRow: { fontSize: 14, color: '#444', marginBottom: 4 },
  netRow: { fontSize: 16, fontWeight: 'bold', color: '#28a745', marginTop: 6 },
});