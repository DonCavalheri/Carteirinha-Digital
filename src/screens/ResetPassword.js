import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../services/supabase';

export default function ResetPassword({ navigation, route }) {
  const [senha, setSenha] = useState('');
  const [confirm, setConfirm] = useState('');
  const cpf = route.params?.cpf; // recebe o CPF da tela anterior

  const handleReset = async () => {
    if (senha !== confirm) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    const { error } = await supabase
      .from('estudantes')
      .update({ senha })
      .eq('cpf', cpf);

    if (error) Alert.alert('Erro', error.message);
    else {
      Alert.alert('Sucesso', 'Senha redefinida!');
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Senha</Text>
      <TextInput placeholder="Nova senha" style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} />
      <TextInput placeholder="Confirmar senha" style={styles.input} secureTextEntry value={confirm} onChangeText={setConfirm} />
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, marginBottom: 15 },
  button: { backgroundColor: '#1E3A8A', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});