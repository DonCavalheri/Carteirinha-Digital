import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { supabase } from '../services/supabase';

export default function Register({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    if (!cpf || !nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const { error } = await supabase
      .from('estudantes')
      .insert([{ id: cpf, nome, email, senha }]);

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Criar Conta</Text>

        <CustomInput placeholder="CPF" value={cpf} onChangeText={setCpf} />
        <CustomInput placeholder="Nome completo" value={nome} onChangeText={setNome} />
        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
        <CustomInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

        <CustomButton title="Registrar" onPress={handleRegister} />

        <View style={styles.footer}>
          <Text style={{ color: '#555' }}>Já possui conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}> Entrar</Text>
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
  footer: { 
    flexDirection: 'row', 
    marginTop: 15 
  },
  link: { 
    color: '#1E3A8A', 
    fontWeight: 'bold' 
  }
});