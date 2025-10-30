import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Eventos from '../screens/Eventos';
import DetalhesIngresso from '../screens/DetalhesIngresso';

const Stack = createStackNavigator();

export default function IngressosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventosPrincipal" component={Eventos} /> 
      <Stack.Screen name="DetalhesIngresso" component={DetalhesIngresso} />
    </Stack.Navigator>
  );
}
