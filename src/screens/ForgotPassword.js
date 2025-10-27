import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { supabase } from '../services/supabase';
import * as Linking from 'expo-linking';

export default function ForgotPassword({ navigation }) {
  const [cpf, setCpf] = useState('');

  const handleRecovery = async () => {
    if (!cpf) {
      Alert.alert('Erro', 'Digite seu CPF.');
      return;
    }

    try {
      // Busca o e-mail vinculado ao CPF informado
      const { data: estudante, error } = await supabase
        .from('estudantes')
        .select('email, nome')
        .eq('cpf', cpf)
        .single();

      if (error || !estudante) {
        Alert.alert('Erro', 'CPF não encontrado.');
        return;
      }

      const { email } = estudante;

      // Gera o deep link do app
      const redirectTo = Linking.createURL('reset-password');

      // Envia o link de redefinição para o e-mail cadastrado
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (resetError) throw resetError;

      const emailOculto = email.replace(/(.{2})(.*)(@.*)/, '$1***$3');
      Alert.alert('Email enviado', `Um link de redefinição foi enviado para ${emailOculto}.`);
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Esqueceu a senha?</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.problemTitle}>
          Digite seu CPF. Um link será enviado para o e-mail vinculado.
        </Text>
        <TextInput
          placeholder="CPF"
          style={styles.input}
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
        />
        <TouchableOpacity style={styles.buttonRedefinir} onPress={handleRecovery}>
          <Text style={styles.buttonText}>Enviar link</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonVoltar}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#2C3E50', paddingTop: 50, paddingBottom: 30, alignItems: 'center' },
  backButton: { position: 'absolute', left: 20, top: 50 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF' },
  body: { flex: 1, padding: 30, alignItems: 'center', backgroundColor: '#FFF' },
  problemTitle: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  input: { width: '100%', borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 12, marginBottom: 20 },
  buttonRedefinir: { width: '100%', backgroundColor: '#B91C1C', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  buttonVoltar: { width: '100%', backgroundColor: '#1E3A8A', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});