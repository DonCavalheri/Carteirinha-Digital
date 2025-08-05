import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { supabase } from '../services/supabase';

export default function Login({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!cpf || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const { data, error } = await supabase
      .from('estudantes')
      .select('*')
      .eq('id', cpf)
      .eq('senha', senha)
      .single();

    if (error || !data) {
      Alert.alert('Erro', 'CPF ou senha inválidos');
    } else {
      navigation.replace('HomeTabs');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="CPF"
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <CustomButton title="Acessar" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Criar conta
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A8A' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  input: { backgroundColor: 'white', width: '90%', padding: 10, marginVertical: 5, borderRadius: 5 },
  link: { color: 'white', marginTop: 10, textDecorationLine: 'underline' },
});