import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { supabase } from '../services/supabase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      navigation.replace('HomeTabs');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <CustomButton title="Acessar" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('ForgotPassword')}>Esqueceu sua senha?</Text>
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Criar conta</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A8A' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  input: { backgroundColor: 'white', width: '90%', padding: 10, marginVertical: 5, borderRadius: 5 },
  link: { color: 'white', marginTop: 10, textDecorationLine: 'underline' },
});
