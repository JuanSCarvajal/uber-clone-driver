import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// AI-assisted: see docs/AI_LOG.md #2
export default function PersonalDataTab({ formData, setFormData, errors, setErrors }) {
  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData({ ...formData, profilePicture: result.assets[0].uri });
      setErrors({ ...errors, profilePicture: '' });
    }
  };

  const validateName = (text) => {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,50}$/;
    if (!text) return 'El nombre es obligatorio';
    if (!nameRegex.test(text)) return 'Máximo 50 caracteres, solo letras y espacios';
    return '';
  };

  const validateDoc = (text) => {
    const docRegex = /^\d{6,10}$/;
    if (!text) return 'El documento es obligatorio';
    if (!docRegex.test(text)) return 'Debe ser numérico entre 6 y 10 dígitos';
    return '';
  };

  const validatePhone = (text) => {
    const phoneRegex = /^\d{10}$/;
    if (!text) return 'El celular es obligatorio';
    if (!phoneRegex.test(text)) return 'Debe tener exactamente 10 dígitos';
    return '';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Foto de perfil *</Text>
      <Button title="Seleccionar foto" onPress={handleImagePick} />
      {formData.profilePicture && (
        <Image source={{ uri: formData.profilePicture }} style={styles.previewImage} />
      )}
      {errors.profilePicture ? <Text style={styles.errorText}>{errors.profilePicture}</Text> : null}

      <Text style={styles.label}>Nombre completo *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Juan Pérez"
        value={formData.fullName}
        onChangeText={(text) => {
          setFormData({ ...formData, fullName: text });
          setErrors({ ...errors, fullName: validateName(text) });
        }}
      />
      {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}

      <Text style={styles.label}>Documento de identidad *</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ej. 1012345678"
        value={formData.documentId}
        onChangeText={(text) => {
          setFormData({ ...formData, documentId: text });
          setErrors({ ...errors, documentId: validateDoc(text) });
        }}
      />
      {errors.documentId ? <Text style={styles.errorText}>{errors.documentId}</Text> : null}

      <Text style={styles.label}>Número de celular *</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="Ej. 3001234567"
        value={formData.phone}
        onChangeText={(text) => {
          setFormData({ ...formData, phone: text });
          setErrors({ ...errors, phone: validatePhone(text) });
        }}
      />
      {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10 },
  errorText: { color: 'red', fontSize: 12, marginTop: 2 },
  previewImage: { width: 100, height: 100, borderRadius: 50, marginTop: 8 }
});