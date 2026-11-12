import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// AI-assisted: see docs/AI_LOG.md #3
export default function VehicleDataTab({ formData, setFormData, errors, setErrors }) {
  const handleVehiclePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) {
      setFormData({ ...formData, vehiclePhoto: result.assets[0].uri });
      setErrors({ ...errors, vehiclePhoto: '' });
    }
  };

  const handlePlateChange = (text) => {
    const formatted = text.toUpperCase(); // Convertir a mayúsculas
    setFormData({ ...formData, plate: formatted });
    const isValid = /^[A-Z]{3}\d{3}$/.test(formatted);
    setErrors({ ...errors, plate: isValid ? '' : 'Formato de placa inválido (ej. ABC123)' });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Placa del vehículo *</Text>
      <TextInput
        style={styles.input}
        placeholder="ABC123"
        autoCapitalize="characters"
        maxLength={6}
        value={formData.plate}
        onChangeText={handlePlateChange}
      />
      {errors.plate ? <Text style={styles.errorText}>{errors.plate}</Text> : null}

      <Text style={styles.label}>Marca y Modelo *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Chevrolet Spark"
        maxLength={30}
        value={formData.brandModel}
        onChangeText={(text) => setFormData({ ...formData, brandModel: text })}
      />

      <Text style={styles.label}>Foto del vehículo (donde se vea la placa) *</Text>
      <Button title="Subir foto del vehículo" onPress={handleVehiclePhoto} />
      {formData.vehiclePhoto && (
        <Image source={{ uri: formData.vehiclePhoto }} style={styles.previewImage} />
      )}
      {errors.vehiclePhoto ? <Text style={styles.errorText}>{errors.vehiclePhoto}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10 },
  errorText: { color: 'red', fontSize: 12, marginTop: 2 },
  previewImage: { width: '100%', height: 150, borderRadius: 8, marginTop: 8 }
});