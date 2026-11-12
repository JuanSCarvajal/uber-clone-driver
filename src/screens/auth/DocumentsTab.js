import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Switch } from 'react-native';

// AI-assisted: see docs/AI_LOG.md #4
export default function DocumentsTab({ formData, setFormData, errors, setErrors }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Correo de Mercado Pago (para recibir pagos) *</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="ejemplo@correo.com"
        value={formData.mercadoPagoEmail}
        onChangeText={(text) => {
          setFormData({ ...formData, mercadoPagoEmail: text });
          const isValid = /\S+@\S+\.\S+/.test(text);
          setErrors({ ...errors, mercadoPagoEmail: isValid ? '' : 'Correo inválido' });
        }}
      />
      {errors.mercadoPagoEmail ? <Text style={styles.errorText}>{errors.mercadoPagoEmail}</Text> : null}

      <View style={styles.checkboxContainer}>
        <Switch
          value={formData.termsAccepted}
          onValueChange={(val) => setFormData({ ...formData, termsAccepted: val })}
        />
        <Text style={styles.termsText}>
          Acepto términos y condiciones. Entiendo que la plataforma cobra un 20% de comisión por viaje[cite: 2, 4].
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10 },
  errorText: { color: 'red', fontSize: 12, marginTop: 2 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  termsText: { flex: 1, marginLeft: 8, fontSize: 13, color: '#444' }
});