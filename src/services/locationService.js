import * as Location from 'expo-location';

const TIMEOUT_MS = 15000;

// Returns { status, coords?, accuracy? }
// status is one of: 'ok', 'denied', 'services-off', 'timeout', 'error'
export async function getUserLocation() {
  const overallTimeout = new Promise((resolve) =>
    setTimeout(() => resolve({ status: 'timeout' }), TIMEOUT_MS)
  );

  const attempt = (async () => {
    try {
      let servicesOn = true;
      try {
        servicesOn = await Location.hasServicesEnabledAsync();
      } catch (e) {
        servicesOn = true;
      }
      console.log('[location] services enabled:', servicesOn);

      const permission = await Location.requestForegroundPermissionsAsync();
      console.log('[location] permission:', permission.status);

      if (permission.status !== 'granted') {
        // If the phone-wide switch is off, say that instead of blaming permission.
        return { status: servicesOn ? 'denied' : 'services-off' };
      }

      if (!servicesOn) {
        return { status: 'services-off' };
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      return {
        status: 'ok',
        coords: { latitude: position.coords.latitude, longitude: position.coords.longitude },
        accuracy: position.coords.accuracy,
      };
    } catch (error) {
      console.log('[location] error:', error && error.message);
      return { status: 'error' };
    }
  })();

  return Promise.race([attempt, overallTimeout]);
}

export function describeLocationProblem(status) {
  switch (status) {
    case 'denied':
      return 'Location permission was not granted. You can still browse the map and search places in the Places tab.';
    case 'services-off':
      return 'Location services are turned off on this phone. Turn them on, or search places in the Places tab.';
    case 'timeout':
      return 'Finding your location took too long. Try again outdoors, or search places in the Places tab.';
    default:
      return 'Could not get your location. You can still search places in the Places tab.';
  }
}