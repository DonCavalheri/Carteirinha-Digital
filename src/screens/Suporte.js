import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabase';

export default function Suporte() {
  const [mensagem, setMensagem] = useState('');
  const [problemaSelecionado, setProblemaSelecionado] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const problemas = [
    { id: 1, titulo: 'Esqueci minha senha', detalhe: 'Isso pode acontecer se você não redefiniu sua senha recentemente. Use a opção "Esqueceu a senha?" na tela de login.' },
    { id: 2, titulo: 'Credencial inválida', detalhe: 'Verifique se seus dados foram digitados corretamente ou se sua conta está ativa.' },
    { id: 3, titulo: 'QR Code não funciona', detalhe: 'Isso pode ocorrer se a câmera do dispositivo não conseguir ler o código ou se o ingresso já tiver sido utilizado.' },
  ];

  // Carregar usuário logado
  useEffect(() => {
    const carregarUsuario = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUsuario(data.user);
      }
    };
    carregarUsuario();
  }, []);

  const enviarMensagem = async () => {
    if (!mensagem.trim()) {
      Alert.alert('Aviso', 'Digite uma mensagem antes de enviar.');
      return;
    }

    if (!usuario) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    const { error } = await supabase
      .from('suporte')
      .insert([
        {
          usuario_id: usuario.id,
          mensagem: mensagem.trim(),
        },
      ]);

    if (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível enviar sua mensagem.');
    } else {
      Alert.alert('Sucesso', 'Sua dúvida foi enviada para a equipe de suporte!');
      setMensagem('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, Enzo</Text>
      <Text style={styles.subtitle}>Está com problemas?</Text>

      <TouchableOpacity style={styles.headerButton}>
        <Text style={styles.headerButtonText}>Problemas frequentes</Text>
      </TouchableOpacity>

      {problemas.map((item) => (
        <View key={item.id} style={styles.problemBox}>
          <TouchableOpacity
            style={styles.problemButton}
            onPress={() =>
              setProblemaSelecionado(problemaSelecionado === item.id ? null : item.id)
            }
          >
            <Text style={styles.problemText}>{item.titulo}</Text>
            <Ionicons
              name={problemaSelecionado === item.id ? 'chevron-up' : 'chevron-forward'}
              size={20}
              color="#1E3A8A"
            />
          </TouchableOpacity>

          {problemaSelecionado === item.id && (
            <Text style={styles.problemDetail}>{item.detalhe}</Text>
          )}
        </View>
      ))}

      <Text style={styles.helpTitle}>Precisa de mais ajuda?</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui o seu problema"
        value={mensagem}
        onChangeText={setMensagem}
        multiline
      />
      <TouchableOpacity style={styles.sendButton} onPress={enviarMensagem}>
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 5, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#111827', textAlign: 'center', marginBottom: 15 },

  headerButton: {
    backgroundColor: '#B91C1C',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  headerButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  problemBox: { marginBottom: 10, backgroundColor: '#F3F4F6', borderRadius: 10 },
  problemButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  problemText: { fontSize: 16, fontWeight: '500', color: '#111827' },
  problemDetail: { fontSize: 14, color: '#374151', padding: 12, paddingTop: 0 },

  helpTitle: {
    backgroundColor: '#B91C1C',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    marginBottom: 10,
    textAlignVertical: 'top',
  },

  sendButton: {
    backgroundColor: '#B91C1C',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});