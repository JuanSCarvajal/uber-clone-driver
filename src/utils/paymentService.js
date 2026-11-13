
const BACKEND_URL = 'http://localhost:3000/api'; // Cambiar por URL de tu backend o Cloud Function


export const createMercadoPagoCheckout = async ({ tripId, amount }) => {
  try {
    const response = await fetch(`${BACKEND_URL}/payments/create-preference`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tripId, amount }),
    });
    const data = await response.json();
    return data.init_point; // URL de Checkout Pro para abrir en react-native-webview
  } catch (error) {
    console.warn('Usando enlace sandbox simulado por falta de backend local');
    return `https://sandbox.mercadopago.com.co/checkout/v1/redirect?pref_id=TEST-${tripId}`;
  }
};

/**
 * Registra el cobro en efectivo realizado por el conductor
 */
export const processCashPayment = (trip) => {
  return {
    ...trip,
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    status: 'paid',
    completedAt: new Date().toISOString(),
  };
};