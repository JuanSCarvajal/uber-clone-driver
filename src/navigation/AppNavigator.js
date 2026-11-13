import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDriver } from '../context/DriverContext';

// Importa tus pantallas creadas previamente
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/main/HomeScreen';
import ActiveTripScreen from '../screens/main/ActiveTripScreen';
import PaymentSummaryScreen from '../screens/main/PaymentSummaryScreen';
import EarningsScreen from '../screens/main/EarningsScreen';
import TripHistoryScreen from '../screens/main/TripHistoryScreen';
import TripDetailScreen from '../screens/main/TripDetailScreen';
import ProfileConfigScreen from '../screens/main/ProfileConfigScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// AI-assisted: see docs/AI_LOG.md #4
function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Inicio">
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Ganancias" component={EarningsScreen} />
      <Drawer.Screen name="Historial" component={TripHistoryScreen} />
      <Drawer.Screen name="Perfil y Configuración" component={ProfileConfigScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const { driver } = useDriver();
  const isApproved = driver?.status === 'Aprobado';

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isApproved ? (
          <Stack.Screen name="Register" component={RegisterScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainDrawer} />
            <Stack.Screen name="ActiveTrip" component={ActiveTripScreen} />
            <Stack.Screen name="PaymentSummary" component={PaymentSummaryScreen} />
            <Stack.Screen name="TripDetail" component={TripDetailScreen} options={{ headerShown: true, title: 'Detalle del Viaje' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}