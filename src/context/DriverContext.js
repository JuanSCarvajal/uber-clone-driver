import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [driver, setDriver] = useState({
    id: 'drv_01',
    name: 'Juan Sebastian Carvajal',
    status: 'Aprobado',
    language: 'es',
  });
  const [isAvailable, setIsAvailable] = useState(false);
  const [activeTrip, setActiveTrip] = useState(null);
  const [completedTrips, setCompletedTrips] = useState([]);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const saved = await AsyncStorage.getItem('@driver_session');
        if (saved) setDriver(JSON.parse(saved));
        const savedTrips = await AsyncStorage.getItem('@completed_trips');
        if (savedTrips) setCompletedTrips(JSON.parse(savedTrips));
      } catch (e) {
        console.error(e);
      }
    };
    loadSession();
  }, []);

  const toggleAvailability = () => setIsAvailable((prev) => !prev);

  const addCompletedTrip = async (trip) => {
    const updated = [trip, ...completedTrips];
    setCompletedTrips(updated);
    try {
      await AsyncStorage.setItem('@completed_trips', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DriverContext.Provider
      value={{
        driver,
        setDriver,
        isAvailable,
        toggleAvailability,
        activeTrip,
        setActiveTrip,
        completedTrips,
        addCompletedTrip,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export const useDriver = () => useContext(DriverContext);