import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../services/supabase';

export default function ResetPassword({ navigation }) {
  const [senha, setSenha] = useState('');
  const [confirm, setConfirm] = useState('');

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        Alert.alert('Redefinição de senha', 'Digite sua nova senha.');
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleReset = async () => {
    if (!senha || !confirm) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (senha !== confirm) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: senha });

      if (error) throw error;

      Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
      navigation.replace('Login');
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinir Senha</Text>

      <TextInput
        placeholder="Nova senha"
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TextInput
        placeholder="Confirmar senha"
        style={styles.input}
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Salvar nova senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, marginBottom: 15 },
  button: { backgroundColor: '#B91C1C', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});