import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useDriverLocation = (isAvailable) => {
  const [location, setLocation] = useState({
    latitude: 6.2442,
    longitude: -75.5812,
  });

  useEffect(() => {
    let subscription = null;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const current = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });

      if (isAvailable) {
        subscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, timeInterval: 3000, distanceInterval: 5 },
          (loc) => {
            setLocation({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            });
          }
        );
      }
    };

    startTracking();

    return () => {
      if (subscription) subscription.remove();
    };
  }, [isAvailable]);

  return { location };
};