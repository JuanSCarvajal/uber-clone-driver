import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useDriver } from '../../context/DriverContext';
import { useDriverLocation } from '../../hooks/useDriverLocation';

export default function HomeScreen() {
  const { isAvailable, toggleAvailability } = useDriver();
  const { location } = useDriverLocation(isAvailable);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio - Conductor</Text>
      <View style={styles.switchRow}>
        <Text style={styles.statusText}>
          Estado: {isAvailable ? 'Disponible 🟢' : 'No disponible 🔴'}
        </Text>
        <Switch value={isAvailable} onValueChange={toggleAvailability} />
      </View>
      <Text style={styles.coords}>
        Ubicación: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 15 },
  statusText: { fontSize: 16, fontWeight: '600' },
  coords: { color: '#666' }
});