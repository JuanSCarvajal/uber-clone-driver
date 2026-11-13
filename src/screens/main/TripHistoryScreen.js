import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Datos de prueba iniciales para visualizar la pantalla
const MOCK_TRIPS = [
  {
    id: '1',
    createdAt: new Date().toISOString(),
    origin: { address: 'Parque Lleras, El Poblado' },
    destination: { address: 'Centro Comercial Santafé' },
    category: 'economy',
    fare: 12500,
    commission: 2500,
    driverEarnings: 10000,
    paymentMethod: 'mercadopago',
    paymentStatus: 'paid',
  },
  {
    id: '2',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // Hace 2 días
    origin: { address: 'Estación Estadio' },
    destination: { address: 'Universidad de Antioquia' },
    category: 'xl',
    fare: 18000,
    commission: 3600,
    driverEarnings: 14400,
    paymentMethod: 'cash',
    paymentStatus: 'paid',
  },
];

// AI-assisted: see docs/AI_LOG.md #6
export default function TripHistoryScreen({ navigation, trips = MOCK_TRIPS }) {
  const [dateFilter, setDateFilter] = useState('ALL'); // 'TODAY', 'WEEK', 'MONTH', 'ALL'
  const [paymentFilter, setPaymentFilter] = useState('ALL'); // 'mercadopago', 'stripe', 'cash', 'ALL'

  const filteredTrips = useMemo(() => {
    const now = new Date();
    return trips
      .filter((trip) => {
        // Filtro por método de pago
        if (paymentFilter !== 'ALL' && trip.paymentMethod !== paymentFilter) return false;

        // Filtro por rango de fecha
        const tripDate = new Date(trip.createdAt);
        if (dateFilter === 'TODAY') {
          return tripDate.toDateString() === now.toDateString();
        }
        if (dateFilter === 'WEEK') {
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return tripDate >= oneWeekAgo;
        }
        if (dateFilter === 'MONTH') {
          return (
            tripDate.getMonth() === now.getMonth() &&
            tripDate.getFullYear() === now.getFullYear()
          );
        }
        return true;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Más reciente primero
      .slice(0, 20); // Límite de 20 viajes por carga
  }, [trips, dateFilter, paymentFilter]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TripDetail', { trip: item })}
    >
      <View style={styles.row}>
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
        <Text style={styles.category}>{item.category.toUpperCase()}</Text>
      </View>

      <Text style={styles.route}>
        {item.origin?.address} → {item.destination?.address}
      </Text>

      <View style={styles.row}>
        <Text style={styles.fare}>Tarifa: ${item.fare} COP</Text>
        <Text style={styles.earnings}>Ganancia: +${item.driverEarnings} COP</Text>
      </View>

      <Text style={styles.status}>
        Método: {item.paymentMethod} | Estado: {item.paymentStatus}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Filtros por Fecha */}
      <View style={styles.filterRow}>
        {[
          { key: 'ALL', label: 'Todos' },
          { key: 'TODAY', label: 'Hoy' },
          { key: 'WEEK', label: 'Semana' },
          { key: 'MONTH', label: 'Mes' },
        ].map((f) => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setDateFilter(f.key)}
            style={[styles.chip, dateFilter === f.key && styles.activeChip]}
          >
            <Text style={dateFilter === f.key ? styles.activeText : styles.text}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filtros por Método de Pago */}
      <View style={styles.filterRow}>
        {[
          { key: 'ALL', label: 'Todos los pagos' },
          { key: 'mercadopago', label: 'Mercado Pago' },
          { key: 'stripe', label: 'Stripe' },
          { key: 'cash', label: 'Efectivo' },
        ].map((p) => (
          <TouchableOpacity
            key={p.key}
            onPress={() => setPaymentFilter(p.key)}
            style={[styles.chip, paymentFilter === p.key && styles.activeChip]}
          >
            <Text style={paymentFilter === p.key ? styles.activeText : styles.text}>
              {p.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTrips}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No hay viajes registrados para los filtros seleccionados.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  chip: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16, backgroundColor: '#e0e0e0' },
  activeChip: { backgroundColor: '#000' },
  text: { color: '#333', fontSize: 12 },
  activeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 10, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  date: { fontSize: 12, color: '#666' },
  category: { fontSize: 12, fontWeight: 'bold', color: '#007bff' },
  route: { fontSize: 14, fontWeight: '600', marginVertical: 6 },
  fare: { fontSize: 13, color: '#444' },
  earnings: { fontSize: 14, fontWeight: 'bold', color: '#28a745' },
  status: { fontSize: 12, color: '#888', marginTop: 4 },
  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: '#777', fontSize: 15, textAlign: 'center' },
});