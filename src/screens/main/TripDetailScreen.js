import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TripDetailScreen({ route }) {
  const trip = route?.params?.trip;

  if (!trip) {
    return (
      <View style={styles.center}>
        <Text>No se encontró información del viaje.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Detalle de la Carrera #{trip.id}</Text>
        <Text style={styles.date}>{new Date(trip.createdAt).toLocaleString()}</Text>

        <View style={styles.divider} />
        <Text style={styles.label}>Origen:</Text>
        <Text style={styles.value}>{trip.origin?.address}</Text>

        <Text style={styles.label}>Destino:</Text>
        <Text style={styles.value}>{trip.destination?.address}</Text>

        <View style={styles.divider} />
        <Text style={styles.row}>Categoría: {trip.category?.toUpperCase()}</Text>
        <Text style={styles.row}>Método de pago: {trip.paymentMethod}</Text>
        <Text style={styles.row}>Estado del pago: {trip.paymentStatus}</Text>

        <View style={styles.divider} />
        <Text style={styles.row}>Tarifa cobrada: ${trip.fare?.toLocaleString()} COP</Text>
        <Text style={styles.row}>Comisión plataforma (20%): -${trip.commission?.toLocaleString()} COP</Text>
        <Text style={styles.net}>Ganancia neta: ${trip.driverEarnings?.toLocaleString()} COP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 2 },
  header: { fontSize: 20, fontWeight: 'bold' },
  date: { fontSize: 13, color: '#666', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 14 },
  label: { fontSize: 12, color: '#888', marginTop: 6 },
  value: { fontSize: 15, fontWeight: '600', color: '#222' },
  row: { fontSize: 14, color: '#333', marginBottom: 6 },
  net: { fontSize: 18, fontWeight: 'bold', color: '#28a745', marginTop: 8 },
});