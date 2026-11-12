import { useMemo } from 'react';

// AI-assisted: see docs/AI_LOG.md #6[cite: 8]
export const useEarnings = (tripsHistory = []) => {
  return useMemo(() => {
    const initialStats = { tripsCount: 0, totalGross: 0, totalCommission: 0, totalTips: 0, netEarnings: 0, averagePerTrip: 0 };

    const today = new Date().toDateString();

    const todayStats = tripsHistory
      .filter(t => new Date(t.createdAt).toDateString() === today)
      .reduce((acc, trip) => {
        acc.tripsCount += 1;
        acc.totalGross += trip.fare;
        acc.totalCommission += trip.commission;
        acc.totalTips += (trip.tip || 0);
        acc.netEarnings += trip.driverEarnings;
        return acc;
      }, { ...initialStats });

    if (todayStats.tripsCount > 0) {
      todayStats.averagePerTrip = Math.round(todayStats.netEarnings / todayStats.tripsCount);
    }

    // Saldo: ganancias pagadas por pasarela menos comisiones de viajes en efectivo[cite: 4, 5]
    const currentBalance = tripsHistory.reduce((balance, trip) => {
      if (trip.paymentMethod === 'cash') {
        return balance - trip.commission; // Se descuenta la comisión del saldo[cite: 4]
      } else if (trip.paymentStatus === 'paid' || trip.status === 'paid') {
        return balance + trip.driverEarnings;
      }
      return balance;
    }, 0);

    return { todayStats, currentBalance };
  }, [tripsHistory]);
};