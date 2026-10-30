import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

function icon(name) {
  return ({ color, size }) => <Ionicons name={name} size={size} color={color} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.onPrimary,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: icon('home') }} />
      <Tabs.Screen name="map" options={{ title: 'Map', tabBarIcon: icon('map') }} />
      <Tabs.Screen name="ask-ai" options={{ title: 'Ask AI', tabBarIcon: icon('chatbubble-ellipses') }} />
      <Tabs.Screen name="places" options={{ title: 'Places', tabBarIcon: icon('business') }} />
      <Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: icon('menu') }} />
    </Tabs>
  );
}