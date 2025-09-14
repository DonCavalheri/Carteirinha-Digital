import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Configuracoes from '../screens/Configuracoes';
import Suporte from '../screens/Suporte';

const Stack = createStackNavigator();

export default function ConfiguracoesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Configuracoes" component={Configuracoes} />
      <Stack.Screen name="Suporte" component={Suporte} />
    </Stack.Navigator>
  );
}