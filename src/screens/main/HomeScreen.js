import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDriver } from '../../context/DriverContext';
import { useDriverLocation } from '../../hooks/useDriverLocation';
import { useTripRequests } from '../../hooks/useTripRequests';
import { calculateFare } from '../../utils/calculateFare';

const DESTINATIONS = [
  { name: 'Centro Comercial Santafé', dLat: -0.012, dLng: 0.014 },
  { name: 'Parque Lleras, El Poblado', dLat: -0.018, dLng: 0.016 },
  { name: 'Estación Estadio', dLat: 0.011, dLng: -0.012 },
  { name: 'Centro Comercial Arkadia', dLat: -0.015, dLng: -0.008 },
  { name: 'Jardín Botánico', dLat: 0.021, dLng: 0.011 },
  { name: 'Plaza Mayor', dLat: 0.005, dLng: 0.004 },
];

const CATEGORIES = ['economy', 'comfort', 'xl'];
const PAYMENT_METHODS = ['mercadopago', 'stripe', 'cash'];

export default function HomeScreen({ navigation }) {
  const { isAvailable, toggleAvailability, setActiveTrip } = useDriver();
  const { location } = useDriverLocation(isAvailable);
  const { incomingRequest, setIncomingRequest, timeLeft, handleAccept, handleReject } = useTripRequests(isAvailable);

  const triggerMockRequest = () => {
    const originObj = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
    let destObj = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
    while (destObj.name === originObj.name) {
      destObj = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
    }

    const distanceKm = Number((Math.random() * 10 + 2.2).toFixed(1));
    const durationMin = Math.round(distanceKm * 2.5 + 4);
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const paymentMethod = PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)];
    const pricing = calculateFare({ distanceKm, durationMin, category });

    setIncomingRequest({
      id: 'trip_' + Date.now(),
      createdAt: new Date().toISOString(),
      origin: {
        address: originObj.name,
        latitude: location.latitude + originObj.dLat * 0.4,
        longitude: location.longitude + originObj.dLng * 0.4,
      },
      destination: {
        address: destObj.name,
        latitude: location.latitude + destObj.dLat,
        longitude: location.longitude + destObj.dLng,
      },
      distanceKm,
      durationMin,
      category,
      paymentMethod,
      ...pricing,
    });
  };

  const onAcceptTrip = () => {
    const trip = handleAccept(incomingRequest);
    setActiveTrip({ ...trip, startLocation: location, status: 'driver_arriving' });
    navigation.navigate('ActiveTrip');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="Tu vehículo"
        />
      </MapView>

      <View style={styles.topCard}>
        <Text style={styles.statusText}>
          {isAvailable ? 'Disponible 🟢' : 'No disponible 🔴'}
        </Text>
        <Switch value={isAvailable} onValueChange={toggleAvailability} />
      </View>

      {isAvailable && !incomingRequest && (
        <TouchableOpacity style={styles.simButton} onPress={triggerMockRequest}>
          <Text style={styles.simButtonText}>+ Simular Solicitud Entrante</Text>
        </TouchableOpacity>
      )}

      {incomingRequest && (
        <View style={styles.requestCard}>
          <Text style={styles.timer}>⏳ Tiempo restante: {timeLeft}s</Text>
          <Text style={styles.route}>Origen: {incomingRequest.origin.address}</Text>
          <Text style={styles.route}>Destino: {incomingRequest.destination.address}</Text>
          <Text style={styles.details}>
            {incomingRequest.distanceKm} km • {incomingRequest.durationMin} min • {incomingRequest.category.toUpperCase()}
          </Text>
          <Text style={styles.details}>Pago: {incomingRequest.paymentMethod.toUpperCase()}</Text>
          <Text style={styles.fare}>
            Tarifa: ${incomingRequest.fare.toLocaleString()} COP | Tu ganancia: ${incomingRequest.driverEarnings.toLocaleString()} COP
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.rejectBtn} onPress={handleReject}>
              <Text style={styles.btnText}>Rechazar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptBtn} onPress={onAcceptTrip}>
              <Text style={styles.btnText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  topCard: {
    position: 'absolute', top: 45, left: 16, right: 16,
    backgroundColor: '#fff', padding: 14, borderRadius: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 4,
  },
  statusText: { fontSize: 16, fontWeight: 'bold' },
  simButton: {
    position: 'absolute', bottom: 30, left: 20, right: 20,
    backgroundColor: '#000', padding: 15, borderRadius: 10, alignItems: 'center', elevation: 4,
  },
  simButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  requestCard: {
    position: 'absolute', bottom: 20, left: 16, right: 16,
    backgroundColor: '#fff', padding: 18, borderRadius: 12, elevation: 6,
  },
  timer: { fontSize: 16, fontWeight: 'bold', color: '#d9534f', textAlign: 'center', marginBottom: 8 },
  route: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  details: { fontSize: 13, color: '#555', marginBottom: 4 },
  fare: { fontSize: 15, fontWeight: 'bold', color: '#28a745', marginVertical: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 8 },
  rejectBtn: { flex: 1, backgroundColor: '#dc3545', padding: 12, borderRadius: 8, alignItems: 'center' },
  acceptBtn: { flex: 1, backgroundColor: '#28a745', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
});