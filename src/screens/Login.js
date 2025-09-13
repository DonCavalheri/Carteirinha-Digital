import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { supabase } from '../services/supabase';

export default function Login({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!cpf || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('estudantes')
        .select('email')
        .eq('cpf', cpf)
        .single();

      if (error || !data) {
        Alert.alert('Erro', 'CPF ou senha inválidos.');
        return;
      }

      const { email } = data;
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (authError) {
        Alert.alert('Erro de Autenticação', authError.message);
        return;
      }

      navigation.replace('HomeTabs', { cpf });
    } catch (err) {
      console.error('Erro inesperado durante o login:', err);
      Alert.alert('Erro', 'Ocorreu um erro inesperado.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Topo azul com voltar + logo */}
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Card branco arredondado */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Bem-vindo</Text>

        {/* Campo CPF */}
        <View style={styles.inputContainer}>
          <Icon name="card-outline" size={22} color="#1E40AF" style={styles.icon} />
          <TextInput
            placeholder="CPF"
            style={styles.input}
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
          />
        </View>

        {/* Campo Senha */}
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={22} color="#1E40AF" style={styles.icon} />
          <TextInput
            placeholder="Senha"
            style={styles.input}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        {/* Botão de Login */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        {/* Link Criar Conta */}
        <View style={styles.registerContainer}>
          <Text>Não possui uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}> Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },

  topContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },

  bottomContainer: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20,
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
    width: '100%',
    height: 50,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
  },

  forgotText: {
    alignSelf: 'flex-end',
    marginVertical: 8,
    color: '#1E40AF',
    fontSize: 14,
  },

  button: {
    backgroundColor: '#1E40AF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  registerLink: {
    color: '#1E40AF',
    fontWeight: 'bold',
  },
});
