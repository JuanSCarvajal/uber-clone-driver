import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DriverContext = createContext();

// AI-assisted: see docs/AI_LOG.md #3
export const DriverProvider = ({ children }) => {
  const [driver, setDriver] = useState({
    id: 'driver_123',
    name: 'Juan Sebastián',
    status: 'Aprobado', // 'Pendiente de aprobación' | 'Aprobado'[cite: 2]
    isAvailable: false,
    language: 'es',
  });
  const [activeTrip, setActiveTrip] = useState(null);

  // Cargar preferencias no sensibles desde AsyncStorage
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('@driver_lang');
        const savedAvailability = await AsyncStorage.getItem('@driver_availability');
        if (savedLang) setDriver(prev => ({ ...prev, language: savedLang }));
        if (savedAvailability) setDriver(prev => ({ ...prev, isAvailable: JSON.parse(savedAvailability) }));
      } catch (e) {
        console.error('Error cargando preferencias de AsyncStorage', e);
      }
    };
    loadPreferences();
  }, []);

  const toggleAvailability = async (value) => {
    setDriver(prev => ({ ...prev, isAvailable: value }));
    await AsyncStorage.setItem('@driver_availability', JSON.stringify(value));
  };

  return (
    <DriverContext.Provider value={{ driver, setDriver, isAvailable: driver.isAvailable, toggleAvailability, activeTrip, setActiveTrip }}>
      {children}
    </DriverContext.Provider>
  );
};

export const useDriver = () => useContext(DriverContext);