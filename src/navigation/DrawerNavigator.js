import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Configuracoes from '../screens/Configuracoes';
import Notificacoes from '../screens/Notícias';
import FrequenciaScreen from '../screens/FrequenciaScreen';
import CalendarioScreen from '../screens/CalendarioScreen';
import ConfiguracoesStack from './ConfiguracoesStack';
import { useRoute } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const route = useRoute();
  const cpf = route.params?.cpf; 
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1E3A8A' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#EF4444',
        drawerInactiveTintColor: '#1E3A8A',
      }}
    >
      <Drawer.Screen name="Principal" component={TabNavigator} initialParams={{ cpf }} />
      <Drawer.Screen name="Notícias" component={Notificacoes} initialParams={{ cpf }} />
      <Drawer.Screen name="Frequência" component={FrequenciaScreen} initialParams={{ cpf }} />
      <Drawer.Screen name="Calendário" component={CalendarioScreen} initialParams={{ cpf }} />
      <Drawer.Screen name="Configurações" component={ConfiguracoesStack} initialParams={{ cpf }} />
    </Drawer.Navigator>
  );
}