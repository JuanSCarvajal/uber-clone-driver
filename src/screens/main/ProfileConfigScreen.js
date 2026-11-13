import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDriver } from '../../context/DriverContext';

export default function ProfileConfigScreen({ navigation }) {
  const { driver, setDriver } = useDriver();

  const toggleLanguage = () => {
    setDriver({ ...driver, language: driver.language === 'es' ? 'en' : 'es' });
  };

  const toggleApproval = () => {
    setDriver({
      ...driver,
      status: driver.status === 'Aprobado' ? 'Pendiente de aprobación' : 'Aprobado',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{driver.name}</Text>
        <Text style={styles.info}>Estado de cuenta: {driver.status}</Text>
        <Text style={styles.info}>Idioma activo: {driver.language === 'es' ? 'Español' : 'English'}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={toggleLanguage}>
        <Text style={styles.btnText}>Cambiar Idioma (ES / EN)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSecondary} onPress={toggleApproval}>
        <Text style={styles.btnText}>Alternar Estado Aprobación (Prueba)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnOutline} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.btnOutlineText}>Ver Formulario de Registro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 2 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  info: { fontSize: 15, color: '#444', marginBottom: 6 },
  btn: { backgroundColor: '#000', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  btnSecondary: { backgroundColor: '#007bff', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  btnOutline: { borderWidth: 1, borderColor: '#000', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  btnOutlineText: { color: '#000', fontWeight: 'bold' },
});