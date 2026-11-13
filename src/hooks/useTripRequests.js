import { useState, useEffect, useCallback } from 'react';


export const useTripRequests = (isAvailable) => {
  const [incomingRequest, setIncomingRequest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15); // Temporizador de 15 segundos[cite: 3]

  // Manejador optimizado con useCallback[cite: 3]
  const handleReject = useCallback(() => {
    setIncomingRequest(null);
    setTimeLeft(15);
  }, []);

  const handleAccept = useCallback((request) => {
    setIncomingRequest(null);
    return request;
  }, []);

  // Control del temporizador regresivo de 15s[cite: 3]
  useEffect(() => {
    let timer = null;
    if (incomingRequest && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (incomingRequest && timeLeft === 0) {
      handleReject(); // Auto-rechazo al llegar a cero[cite: 3]
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [incomingRequest, timeLeft, handleReject]);

  return { incomingRequest, setIncomingRequest, timeLeft, handleAccept, handleReject };
};