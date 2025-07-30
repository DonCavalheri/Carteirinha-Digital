import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Credencial from '../screens/Credencial';
import Eventos from '../screens/Eventos';
import Ingressos from '../screens/Ingressos';
import Dados from '../screens/Dados';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Início') iconName = 'home';
          else if (route.name === 'Credencial') iconName = 'card';
          else if (route.name === 'Eventos') iconName = 'calendar';
          else if (route.name === 'Ingressos') iconName = 'ticket';
          else if (route.name === 'Dados') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#EF4444',
        tabBarInactiveTintColor: '#1E3A8A',
        headerShown: false
      })}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Credencial" component={Credencial} />
      <Tab.Screen name="Eventos" component={Eventos} />
      <Tab.Screen name="Ingressos" component={Ingressos} />
      <Tab.Screen name="Dados" component={Dados} />
    </Tab.Navigator>
  );
}