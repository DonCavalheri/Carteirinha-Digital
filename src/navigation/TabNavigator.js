import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Credencial from '../screens/Credencial';
import Eventos from '../screens/Eventos'; 
import Ingressos from '../screens/Ingressos'; 
import Dados from '../screens/Dados';
import DetalhesView from '../screens/DetalhesView'; 
import { Ionicons } from '@expo/vector-icons';

import IngressosStack from './IngressosStack'; 

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Início') iconName = 'home';
          else if (route.name === 'Ingressos') iconName = 'ticket'; 
          else if (route.name === 'Credencial') iconName = 'card';
          else if (route.name === 'Eventos') iconName = 'calendar'; 
          else if (route.name === 'Dados') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#B91C1C',
        tabBarInactiveTintColor: '#1E40AF',
        headerShown: false
      })}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Ingressos" component={Ingressos} />
      <Tab.Screen name="Credencial" component={Credencial} />
      <Tab.Screen name="Eventos" component={IngressosStack} />
      <Tab.Screen name="Dados" component={Dados} />
      <Tab.Screen 
        name="DetalhesView" 
        component={DetalhesView} 
        options={{ tabBarButton: () => null }} 
      />
    </Tab.Navigator>
  );
}