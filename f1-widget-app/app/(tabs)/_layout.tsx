import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#E10600' }}>
      <Tabs.Screen name="next-race"  options={{ title: 'Prochain GP' }} />
      <Tabs.Screen name="standings"  options={{ title: 'Classements' }} />
      <Tabs.Screen name="last-race"  options={{ title: 'Résultats' }} />
      <Tabs.Screen name="live"       options={{ title: 'Live' }} />
    </Tabs>
  );
}