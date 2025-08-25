import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { supabase } from '../services/supabase';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Login({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!cpf || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      // Busca o email na tabela 'estudantes' usando o CPF como identificador
      const { data, error } = await supabase
        .from('estudantes')
        .select('email')
        .eq('cpf', cpf) // Usa a coluna 'cpf' (que agora é sua PK) para buscar o estudante
        .single();

      if (error || !data) {
        Alert.alert('Erro', 'CPF ou senha inválidos.');
        return;
      }

      const { email } = data;

      // Tenta autenticar no Supabase Auth com o email encontrado e a senha
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (authError) {
        Alert.alert('Erro de Autenticação', authError.message);
      } else {
        navigation.replace('HomeTabs');
      }
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
        <Text style={styles.title}>Login</Text>

        <CustomInput
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <CustomButton title="Acessar" onPress={handleLogin} customStyle={styles.loginButton} />

        <View style={styles.registerContainer}>
          <Text>Não possui uma conta?</Text>
          {/* CORREÇÃO AQUI: Removido o espaço em branco (' ') fora do componente <Text> */}
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>
              Criar conta
            </Text>
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

  forgotText: {
    alignSelf: 'flex-end',
    marginVertical: 8,
    color: '#1E40AF',
    fontSize: 14,
  },

  loginButton: {
    marginTop: 15,
    width: '100%',
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