import React, { useState } from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
=======
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
>>>>>>> 8ea0f58 (Estilização e telas)
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { supabase } from '../services/supabase';
import Icon from 'react-native-vector-icons/Ionicons'; // para o ícone de voltar (opcional)

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
<<<<<<< HEAD
      {/* Logo no topo */}
      <Image 
        source={require('../../assets/logo.png')} 
        style={{ width: 120, height: 120, marginBottom: 20 }} 
      />

      {/* Card branco arredondado */}
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <CustomInput placeholder="CPF" value={cpf} onChangeText={setCpf} />
        <CustomInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgot}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <CustomButton title="Acessar" onPress={handleLogin} />

        <View style={styles.footer}>
          <Text style={{ color: '#555' }}>Não possui uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}> Criar conta</Text>
          </TouchableOpacity>
=======
      {/* Topo azul */}
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Logo */}
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>

      {/* Parte branca com o card de login */}
      <View style={styles.bottomContainer}>
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

        <Text style={styles.forgotText}>Esqueceu sua senha?</Text>

        <CustomButton title="Acessar" onPress={handleLogin} customStyle={styles.loginButton} />

        <View style={styles.registerContainer}>
          <Text>Não possui uma conta? </Text>
          <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
            Criar conta
          </Text>
>>>>>>> 8ea0f58 (Estilização e telas)
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
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
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#1E3A8A',
    marginBottom: 15 
  },
  forgot: { 
    color: '#1E3A8A', 
    marginVertical: 10, 
    alignSelf: 'flex-start' 
  },
  footer: { 
    flexDirection: 'row', 
    marginTop: 15 
  },
  link: { 
    color: '#1E3A8A', 
    fontWeight: 'bold' 
  }
=======
  container: { flex: 1, backgroundColor: '#1E3A8A' },
  
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
    width: 100,
    height: 100,
  },

  bottomContainer: {
    flex: 2,
    backgroundColor: '#F5F5F5', // parte branca/cinza claro
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },

  title: { fontSize: 26, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 20 },
  
  input: { 
    backgroundColor: 'white',
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  forgotText: {
    alignSelf: 'flex-end',
    marginVertical: 5,
    color: '#1E40AF',
    fontSize: 14,
  },

  loginButton: {
    backgroundColor: '#B91C1C', // vermelho do botão
    marginTop: 15,
    width: '100%',
  },

  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerLink: {
    color: '#1E40AF',
    fontWeight: 'bold',
  },
>>>>>>> 8ea0f58 (Estilização e telas)
});