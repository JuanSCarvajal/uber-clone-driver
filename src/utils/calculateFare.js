import { PRICING_CONFIG } from '../config/pricing';

// AI-assisted: see docs/AI_LOG.md #1[cite: 8]
/**
 * Función pura que calcula tarifa final, comisión y ganancias del conductor.[cite: 5]
 * @param {Object} params - Datos del viaje
 * @param {number} params.distanceKm - Distancia en km desde Google Distance Matrix[cite: 5]
 * @param {number} params.durationMin - Duración en minutos desde Google Distance Matrix[cite: 5]
 * @param {string} params.category - Categoría ('economy', 'xl', 'premium')[cite: 5]
 * @param {number} [params.tip=0] - Propina opcional en COP[cite: 4, 5]
 * @returns {Object} { fare, commission, driverEarnings, commissionRate }[cite: 5, 6]
 */
export const calculateFare = ({ distanceKm, durationMin, category = 'economy', tip = 0 }) => {
  const multiplier = PRICING_CONFIG.CATEGORIES[category] || 1.0;

  // Fórmula: Base + (km * Vkm) + (min * Vmin)[cite: 5]
  const rawCalculated = 
    PRICING_CONFIG.BASE_FARE + 
    (distanceKm * PRICING_CONFIG.PRICE_PER_KM) + 
    (durationMin * PRICING_CONFIG.PRICE_PER_MIN);

  // Aplica multiplicador y valida contra tarifa mínima[cite: 5]
  const subtotal = Math.max(PRICING_CONFIG.MINIMUM_FARE, rawCalculated * multiplier);

  // Redondeo al múltiplo de 100 COP más cercano[cite: 5]
  const fare = Math.round(subtotal / 100) * 100;

  // Comisión de la plataforma sobre la tarifa redondeada[cite: 4, 5]
  const commission = Math.round(fare * PRICING_CONFIG.PLATFORM_COMMISSION_RATE);

  // Ganancia neta = Tarifa - Comisión + Propina[cite: 5]
  const driverEarnings = (fare - commission) + tip;

  return {
    fare,
    commission,
    driverEarnings,
    commissionRate: PRICING_CONFIG.PLATFORM_COMMISSION_RATE
  };
};