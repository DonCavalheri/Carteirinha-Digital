import React, { useState } from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
=======
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
>>>>>>> 8ea0f58 (Estilização e telas)
import CustomButton from '../components/CustomButton';
import { supabase } from '../services/supabase';
import Icon from 'react-native-vector-icons/Ionicons'; // para os ícones de senha e voltar

export default function Register({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);

  const handleRegister = async () => {
<<<<<<< HEAD
    if (!cpf || !nome || !email || !senha) {
=======
    if (!nome || !cpf || !email || !senha || !confirmarSenha) {
>>>>>>> 8ea0f58 (Estilização e telas)
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
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
<<<<<<< HEAD
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
=======
      {/* Topo azul */}
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>

      {/* Parte branca de formulário */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Crie sua conta</Text>

        <TextInput
          placeholder="Digite seu CPF"
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Nome completo"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        {/* Campo senha com ícone */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Senha"
            style={[styles.input, { flex: 1, marginVertical: 0 }]}
            secureTextEntry={!senhaVisivel}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
            <Icon
              name={senhaVisivel ? "eye-off" : "eye"}
              size={22}
              color="#777"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>

        {/* Campo repetir senha */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Repetir senha"
            style={[styles.input, { flex: 1, marginVertical: 0 }]}
            secureTextEntry={!confirmarSenhaVisivel}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
          <TouchableOpacity onPress={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}>
            <Icon
              name={confirmarSenhaVisivel ? "eye-off" : "eye"}
              size={22}
              color="#777"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>

        <CustomButton title="Criar conta" onPress={handleRegister} customStyle={styles.registerButton} />
>>>>>>> 8ea0f58 (Estilização e telas)
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
    backgroundColor: '#F5F5F5',
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
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 8,
    paddingRight: 5,
    width: '100%',
  },

  registerButton: {
    backgroundColor: '#B91C1C',
    marginTop: 20,
    width: '100%',
    borderRadius: 25,
  },
>>>>>>> 8ea0f58 (Estilização e telas)
});