import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, Alert } from 'react-native';
import PersonalDataTab from './PersonalDataTab';
import VehicleDataTab from './VehicleDataTab';
import DocumentsTab from './DocumentsTab';

// AI-assisted: see docs/AI_LOG.md #5
export default function RegisterScreen() {
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '', documentId: '', phone: '', profilePicture: null,
    plate: '', brandModel: '', vehiclePhoto: null,
    mercadoPagoEmail: '', termsAccepted: false,
    status: 'Pendiente de aprobación' // Estado inicial obligatorio[cite: 2]
  });
  const [errors, setErrors] = useState({});

  // Botón solo habilitado si las 3 pestañas son válidas[cite: 2]
  const isFormValid = () => {
    return (
      formData.fullName && formData.documentId && formData.phone && formData.profilePicture &&
      formData.plate && formData.vehiclePhoto &&
      formData.mercadoPagoEmail && formData.termsAccepted &&
      Object.values(errors).every(e => e === '')
    );
  };

  const handleSubmit = () => {
    Alert.alert("Registro enviado", "Tu cuenta está Pendiente de aprobación[cite: 2].");
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabHeader}>
        <Button title="1. Personales" onPress={() => setActiveTab(1)} color={activeTab === 1 ? '#000' : '#888'} />
        <Button title="2. Vehículo" onPress={() => setActiveTab(2)} color={activeTab === 2 ? '#000' : '#888'} />
        <Button title="3. Docs" onPress={() => setActiveTab(3)} color={activeTab === 3 ? '#000' : '#888'} />
      </View>

      {activeTab === 1 && <PersonalDataTab formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />}
      {activeTab === 2 && <VehicleDataTab formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />}
      {activeTab === 3 && <DocumentsTab formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />}

      <View style={styles.footer}>
        <Button title="Enviar Registro" onPress={handleSubmit} disabled={!isFormValid()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  tabHeader: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 40, paddingBottom: 10, backgroundColor: '#f4f4f4' },
  footer: { padding: 16, borderTopWidth: 1, borderColor: '#eee' }
});