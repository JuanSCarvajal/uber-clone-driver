import { useState, useEffect } from 'react';

// AI-assisted: see docs/AI_LOG.md #4[cite: 8]
/**
 * Hook personalizado para rastreo de ubicación en tiempo real con cleanup.
 */
export const useDriverLocation = (isAvailable) => {
  const [location, setLocation] = useState({
    latitude: 6.2442,  // Ubicación inicial por defecto
    longitude: -75.5812,
    heading: 0,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let watchId = null;

    if (isAvailable) {
      // Simulación de seguimiento continuo / Geolocation.watchPosition[cite: 3, 7]
      watchId = setInterval(() => {
        setLocation(prev => ({
          latitude: prev.latitude + (Math.random() - 0.5) * 0.001,
          longitude: prev.longitude + (Math.random() - 0.5) * 0.001,
          heading: Math.floor(Math.random() * 360),
        }));
      }, 4000); // Actualiza cada 4 segundos para no agotar cupos[cite: 3, 7]
    }

    // Función de limpieza obligatoria[cite: 3]
    return () => {
      if (watchId) clearInterval(watchId);
    };
  }, [isAvailable]);

  return { location, errorMsg };
};