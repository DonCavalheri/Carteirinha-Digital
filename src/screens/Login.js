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
      {/* Topo azul com voltar + logo */}
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Image
          source={require('../../assets/logo.png')} // ajuste o caminho se necessário
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
          <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
            {' '}Criar conta
          </Text>
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