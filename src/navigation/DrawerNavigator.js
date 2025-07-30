import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Configuracoes from '../screens/Configuracoes';
import Notificacoes from '../screens/Notificacoes';
import Frequencia from '../screens/Frequencia';
import Calendario from '../screens/Calendario';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1E3A8A' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#EF4444',
        drawerInactiveTintColor: '#1E3A8A',
      }}
    >
      {/* Tabs ficam como a primeira tela do drawer */}
      <Drawer.Screen name="Principal" component={TabNavigator} />
      <Drawer.Screen name="Notificações" component={Notificacoes} />
      <Drawer.Screen name="Frequência" component={Frequencia} />
      <Drawer.Screen name="Calendário" component={Calendario} />
      <Drawer.Screen name="Configurações" component={Configuracoes} />
    </Drawer.Navigator>
  );
}