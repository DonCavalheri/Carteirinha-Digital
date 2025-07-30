import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { supabase } from '../services/supabase';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://seu-site.com/reset-password', // Defina um link válido
    });
    if (error) Alert.alert('Erro', error.message);
    else Alert.alert('Sucesso', 'Verifique seu email para redefinir a senha.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueceu a senha?</Text>
      <TextInput placeholder="Digite seu email" style={styles.input} value={email} onChangeText={setEmail} />
      <CustomButton title="Redefinir senha" onPress={handleReset} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Voltar para o login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A8A' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  input: { backgroundColor: 'white', width: '90%', padding: 10, marginVertical: 5, borderRadius: 5 },
  link: { color: 'white', marginTop: 10, textDecorationLine: 'underline' },
});