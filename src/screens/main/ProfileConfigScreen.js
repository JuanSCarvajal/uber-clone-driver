import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDriver } from '../../context/DriverContext';

export default function ProfileConfigScreen() {
  const { driver } = useDriver();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil y Configuración</Text>
      <Text>Conductor: {driver.name}</Text>
      <Text>Estado: {driver.status}</Text>
      <Text>Idioma: {driver.language}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }
});