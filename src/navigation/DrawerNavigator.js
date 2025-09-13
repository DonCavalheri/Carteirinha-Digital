import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Configuracoes from '../screens/Configuracoes';
import Notificacoes from '../screens/Notificacoes';
import FrequenciaScreen from '../screens/FrequenciaScreen';
import CalendarioScreen from '../screens/CalendarioScreen';
import { useRoute } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const route = useRoute();
  const cpf = route.params?.cpf; // <-- pega o cpf vindo do login

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1E3A8A' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#EF4444',
        drawerInactiveTintColor: '#1E3A8A',
      }}
    >
      {/* Tabs recebem o cpf também */}
      <Drawer.Screen name="Principal" component={TabNavigator} initialParams={{ cpf }} />
      <Drawer.Screen name="Notificações" component={Notificacoes} initialParams={{ cpf }} />
      <Drawer.Screen name="Frequência" component={FrequenciaScreen} initialParams={{ cpf }} />
      <Drawer.Screen name="Calendário" component={CalendarioScreen} initialParams={{ cpf }} />
      <Drawer.Screen name="Configurações" component={Configuracoes} initialParams={{ cpf }} />
    </Drawer.Navigator>
  );
}