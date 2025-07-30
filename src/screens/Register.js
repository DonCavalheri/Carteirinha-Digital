import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { supabase } from '../services/supabase';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Conta criada! Verifique seu email.');
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>
      <TextInput placeholder="Nome completo" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <CustomButton title="Criar conta" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A8A' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  input: { backgroundColor: 'white', width: '90%', padding: 10, marginVertical: 5, borderRadius: 5 },
});