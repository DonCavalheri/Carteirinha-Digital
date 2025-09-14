import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ingressos from '../screens/Ingressos';
import DetalhesIngresso from '../screens/DetalhesIngresso';

const Stack = createNativeStackNavigator();

export default function IngressosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="IngressosLista" 
        component={Ingressos} 
        options={{ title: 'Meus Ingressos' }}
      />
      <Stack.Screen 
        name="DetalhesIngresso" 
        component={DetalhesIngresso} 
        options={{ title: 'Detalhes do Ingresso' }}
      />
    </Stack.Navigator>
  );
}