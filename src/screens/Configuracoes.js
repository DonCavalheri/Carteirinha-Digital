import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { supabase } from '../services/supabase';

export default function Configuracoes({ navigation }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <CustomButton title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A8A' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20 },
});