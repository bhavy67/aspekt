import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../../lib/theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TABS: { name: string; label: string; icon: IoniconName; iconActive: IoniconName }[] = [
  { name: 'index', label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { name: 'explore', label: 'Explore', icon: 'compass-outline', iconActive: 'compass' },
  { name: 'collections', label: 'Collections', icon: 'albums-outline', iconActive: 'albums' },
  { name: 'profile', label: 'Profile', icon: 'person-outline', iconActive: 'person' },
];

export default function TabLayout() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.accent.flatDark,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.5,
        },
      }}
    >
      {TABS.map(({ name, label, icon, iconActive }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: label,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name={focused ? iconActive : icon} size={22} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
