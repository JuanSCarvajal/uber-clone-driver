import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PaymentSummaryScreen({ route, navigation }) {
  const trip = route?.params?.trip || {
    origin: { address: 'Origen' },
    destination: { address: 'Destino' },
    distanceKm: 0,
    durationMin: 0,
    paymentMethod: 'cash',
    fare: 0,
    commission: 0,
    driverEarnings: 0,
    paymentStatus: 'Aprobado',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen del Viaje y Cobro</Text>

      <View style={styles.card}>
        <Text style={styles.route}>Desde: {trip.origin?.address}</Text>
        <Text style={styles.route}>Hasta: {trip.destination?.address}</Text>
        <Text style={styles.meta}>
          Distancia: {trip.distanceKm} km • Duración: {trip.durationMin} min
        </Text>
        <Text style={styles.meta}>Método de pago: {trip.paymentMethod?.toUpperCase()}</Text>

        <View style={styles.divider} />

        <Text style={styles.row}>Tarifa final: ${trip.fare?.toLocaleString()} COP</Text>
        <Text style={styles.row}>Comisión plataforma (20%): -${trip.commission?.toLocaleString()} COP</Text>
        <Text style={styles.earnings}>Ganancia neta: ${trip.driverEarnings?.toLocaleString()} COP</Text>
        <Text style={styles.status}>Estado del pago: {trip.paymentStatus}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.popToTop()}>
        <Text style={styles.btnText}>Volver al Mapa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 3 },
  route: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  meta: { fontSize: 13, color: '#666', marginBottom: 4 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  row: { fontSize: 15, marginBottom: 6, color: '#333' },
  earnings: { fontSize: 20, fontWeight: 'bold', color: '#28a745', marginTop: 8, marginBottom: 10 },
  status: { fontSize: 15, fontWeight: 'bold', color: '#007bff' },
  btn: { backgroundColor: '#000', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});