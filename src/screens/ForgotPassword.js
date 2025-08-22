import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { supabase } from '../services/supabase';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Erro', 'Digite seu email');
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Verifique seu email para redefinir a senha.');
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Esqueceu a Senha?</Text>
        <Text style={styles.subtitle}>
          Digite seu email e enviaremos um link para redefinir sua senha.
        </Text>

        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />

        <CustomButton title="Enviar" onPress={handleReset} />

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Voltar para Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1E3A8A', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    alignItems: 'center'
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1E3A8A',
    marginBottom: 10 
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15
  },
  link: { 
    color: '#1E3A8A', 
    marginTop: 15, 
    textDecorationLine: 'underline' 
  }
});