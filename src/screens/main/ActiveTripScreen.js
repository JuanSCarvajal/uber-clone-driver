import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useDriver } from '../../context/DriverContext';

export default function ActiveTripScreen({ navigation }) {
  const { activeTrip, setActiveTrip, addCompletedTrip } = useDriver();
  const [step, setStep] = useState('pickup'); // 'pickup' -> 'dropoff'
  const [carPos, setCarPos] = useState(
    activeTrip?.startLocation || { latitude: 6.2442, longitude: -75.5812 }
  );

  const targetPoint = step === 'pickup' ? activeTrip?.origin : activeTrip?.destination;

  // Mueve el vehículo gradualmente hacia el destino actual en el mapa
  useEffect(() => {
    if (!targetPoint) return;

    const interval = setInterval(() => {
      setCarPos((prev) => {
        const latDiff = targetPoint.latitude - prev.latitude;
        const lngDiff = targetPoint.longitude - prev.longitude;

        if (Math.abs(latDiff) < 0.0002 && Math.abs(lngDiff) < 0.0002) {
          clearInterval(interval);
          return { latitude: targetPoint.latitude, longitude: targetPoint.longitude };
        }

        return {
          latitude: prev.latitude + latDiff * 0.15,
          longitude: prev.longitude + lngDiff * 0.15,
        };
      });
    }, 800);

    return () => clearInterval(interval);
  }, [step, targetPoint]);

  if (!activeTrip) {
    return (
      <View style={styles.center}>
        <Text>No hay un viaje activo.</Text>
      </View>
    );
  }

  const handleNextStep = async () => {
    if (step === 'pickup') {
      setCarPos({
        latitude: activeTrip.origin.latitude,
        longitude: activeTrip.origin.longitude,
      });
      setStep('dropoff');
      setActiveTrip({ ...activeTrip, status: 'in_progress' });
    } else {
      const completedTrip = {
        ...activeTrip,
        paymentStatus: activeTrip.paymentMethod === 'cash' ? 'Efectivo' : 'Aprobado',
      };
      await addCompletedTrip(completedTrip);
      setActiveTrip(null);
      navigation.replace('PaymentSummary', { trip: completedTrip });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: (carPos.latitude + targetPoint.latitude) / 2,
          longitude: (carPos.longitude + targetPoint.longitude) / 2,
          latitudeDelta: Math.abs(carPos.latitude - targetPoint.latitude) * 2.2 + 0.01,
          longitudeDelta: Math.abs(carPos.longitude - targetPoint.longitude) * 2.2 + 0.01,
        }}
      >
        <Marker coordinate={carPos} title="🚗 Tu vehículo" pinColor="blue" />
        <Marker coordinate={targetPoint} title={targetPoint.address} />
        <Polyline
          coordinates={[carPos, targetPoint]}
          strokeColor="#000"
          strokeWidth={4}
        />
      </MapView>

      <View style={styles.bottomCard}>
        <Text style={styles.phaseTitle}>
          {step === 'pickup' ? '1. En camino a recoger al pasajero' : '2. En viaje hacia el destino'}
        </Text>
        <Text style={styles.address}>{targetPoint.address}</Text>
        <Text style={styles.fare}>Ganancia estimada: ${activeTrip.driverEarnings.toLocaleString()} COP</Text>

        <TouchableOpacity style={styles.actionBtn} onPress={handleNextStep}>
          <Text style={styles.btnText}>
            {step === 'pickup' ? 'Pasajero a bordo' : 'Finalizar viaje'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: { flex: 1 },
  bottomCard: {
    position: 'absolute', bottom: 20, left: 16, right: 16,
    backgroundColor: '#fff', padding: 18, borderRadius: 12, elevation: 6,
  },
  phaseTitle: { fontSize: 13, fontWeight: 'bold', color: '#007bff', marginBottom: 4 },
  address: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  fare: { fontSize: 14, color: '#28a745', fontWeight: '600', marginBottom: 14 },
  actionBtn: { backgroundColor: '#000', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});