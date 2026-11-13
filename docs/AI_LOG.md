# Bitácora de Uso de IA

### Entrada #1
- **Fecha:** 2026-11-10
- **Integrante:** Juan Sebastian Carvajal Carvajal
- **Herramienta:** Gemini
- **Objetivo:** Estructurar el proyecto en React Native (Expo) y crear la función pura `calculateFare` para tarifas y comisiones.
- **Prompt:** "Necesito la estructura de carpetas para la app de conductor en React Native con Expo y la función pura para calcular las tarifas, comisión del 20% y ganancia neta."
- **Resumen de la respuesta:** Proporcionó la arquitectura base de carpetas (`config`, `utils`, `hooks`, `context`, `screens`) y el algoritmo de redondeo a múltiplos de 100 COP en `calculateFare.js`.
- **Qué se usó / modificó / descartó:** Se utilizó la estructura de carpetas y la lógica de cálculo de tarifas sin modificaciones.
- **Archivos y commit:** `src/config/pricing.js`, `src/utils/calculateFare.js`, `.env.example`
- **Verificación:** Probado con el caso de prueba del documento (8.5 km y 22 min para categorías Económico y XL).
- **Aprendizaje:** Separación del cálculo financiero en una función pura reutilizable.

### Entrada #2
- **Fecha:** 2026-11-11
- **Integrante:** Juan Sebastian Carvajal Carvajal
- **Herramienta:** Gemini
- **Objetivo:** Implementar el formulario de registro dividido en 3 pestañas con validaciones debajo de cada campo y los hooks personalizados (`useDriverLocation`, `useTripRequests`, `useEarnings`).
- **Prompt:** "Necesito crear las pantallas del formulario de registro de conductor con sus validaciones y los hooks personalizados de ubicación en tiempo real, solicitudes con temporizador y ganancias."
- **Resumen de la respuesta:** Generó las pestañas `PersonalDataTab.js`, `VehicleDataTab.js`, `DocumentsTab.js` y los hooks con manejo de limpieza en `useEffect`, `useCallback` y `useMemo`.
- **Qué se usó / modificó / descartó:** Se integraron las validaciones de placa colombiana y el temporizador regresivo de 15 segundos para rechazar solicitudes.
- **Archivos y commit:** `src/screens/auth/RegisterScreen.js`, `src/context/DriverContext.js`, `src/hooks/useDriverLocation.js`, `src/hooks/useTripRequests.js`, `src/hooks/useEarnings.js`
- **Verificación:** Probado en Expo Go verificando que los errores aparecen debajo de cada campo y el rastreo se detiene al cambiar de estado.
- **Aprendizaje:** Uso de funciones de limpieza en `useEffect` y optimización de cálculos financieros con `useMemo`.

### Entrada #3
- **Fecha:** 2026-11-12
- **Integrante:** Juan Sebastian Carvajal Carvajal
- **Herramienta:** Gemini
- **Objetivo:** Configurar navegación combinada (Stack y Drawer), servicio de pagos de prueba y listado del historial con filtros.
- **Prompt:** "Necesito conectar la navegación combinada Stack y Drawer, el flujo de cobro y el historial de carreras con FlatList y filtros."
- **Resumen de la respuesta:** Entregó `AppNavigator.js`, `paymentService.js` para Checkout Pro/efectivo y `TripHistoryScreen.js` con filtros por fecha y método de pago.
- **Qué se usó / modificó / descartó:** Se ajustaron las rutas de las pantallas principales y el componente vacío de `FlatList`.
- **Archivos y commit:** `src/navigation/AppNavigator.js`, `src/utils/paymentService.js`, `src/screens/main/TripHistoryScreen.js`, `App.js`
- **Verificación:** Ejecutado en dispositivo móvil comprobando el menú lateral Drawer, los filtros del historial y el resumen de cobro.
- **Aprendizaje:** Integración de navegadores anidados y manejo de estados de viaje.