import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import StackNavigator from './src/navigation/StackNavigator.js';
import { supabase } from './src/services/supabase'; // Certifique-se de que o caminho está correto

// Define o prefixo do seu deep link
// Expo vai usar o "scheme" do app.json para construir o prefixo
const prefix = Linking.createURL('/');

// Objeto de configuração para o deep linking
const linking = {
  prefixes: [prefix], // Expo já cuida de adicionar 'myapp://' automaticamente
  config: {
    screens: {
      Login: 'login', // A tela para onde o usuário será redirecionado
      // Adicione outras telas que podem ser acessadas via deep link, se necessário
    },
  },
};

export default function App() {
  // Use um useEffect para lidar com o deep linking e a sessão do Supabase
  useEffect(() => {
    // Escuta eventos de URL
    const handleUrl = ({ url }) => {
      const { path, queryParams } = Linking.parse(url);
      
      // Verifica se a URL é para confirmação de e-mail
      if (path === 'confirmation' && queryParams?.token) {
        // O Supabase lida com a troca de token automaticamente
        // O app deve apenas carregar a tela de login
        // ou a tela que lida com a autenticação
        // Você pode adicionar uma lógica aqui para mostrar uma mensagem de sucesso
        // ou redirecionar o usuário para a tela de login
      }
    };

    // Adiciona o listener para as URLs de entrada
    Linking.addEventListener('url', handleUrl);

    // Limpa o listener quando o componente é desmontado
    return () => {
      Linking.removeEventListener('url', handleUrl);
    };
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <StackNavigator />
    </NavigationContainer>
  );
}