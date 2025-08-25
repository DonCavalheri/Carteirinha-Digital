import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../theme';
import { supabase } from '../services/supabase';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !cpf || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      // 1) Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        Alert.alert('Erro', authError.message);
        return;
      }

      // 2) Salvar dados adicionais na tabela `estudantes`
      const { error: insertError } = await supabase
        .from('estudantes')
        .insert([
          {
            cpf: cpf,
            email,
            nome: name,
            validade: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            // outros campos opcionais aqui, caso existam e permitam NULL
          }
        ]);

      if (insertError) {
        Alert.alert('Erro', insertError.message);
        // Opcional: deletar usuário do Auth para evitar registros órfãos
        // await supabase.auth.admin.deleteUser(authData.user.id);
        return;
      }

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro inesperado', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua Conta</Text>

      <View style={styles.inputContainer}>
        <Icon name="person-outline" size={22} color="#B91C1C" style={styles.icon} />
        <TextInput
          placeholder="Nome completo"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="card-outline" size={22} color="#B91C1C" style={styles.icon} />
        <TextInput
          placeholder="CPF"
          style={styles.input}
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={22} color="#B91C1C" style={styles.icon} />
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={22} color="#B91C1C" style={styles.icon} />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
  },
  button: {
    backgroundColor: '#B91C1C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#1E40AF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});