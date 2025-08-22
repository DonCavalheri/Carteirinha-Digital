import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
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
        </View>
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
});