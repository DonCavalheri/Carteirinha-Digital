import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../services/supabase';

export default function Dados() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  const buscarDados = async () => {
    setLoading(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) {
        Alert.alert('Erro', 'Sessão do usuário não encontrada.');
        setLoading(false);
        return;
      }
      const userEmail = session.user.email;

      // Primeiro, busca o CPF do estudante usando o email
      const { data: estudanteData, error: estudanteError } = await supabase
        .from('estudantes')
        .select('cpf')
        .eq('email', userEmail)
        .single();

      if (estudanteError || !estudanteData) {
        Alert.alert('Erro', 'Não foi possível encontrar o CPF do usuário na base de dados.');
        setLoading(false);
        return;
      }

      const cpfUsuario = estudanteData.cpf;

      // Em seguida, busca os dados completos do estudante usando o CPF
      const { data, error } = await supabase
        .from('estudantes')
        .select('cpf, nome, sobrenome, instituicao, curso, data_nascimento, genero')
        .eq('cpf', cpfUsuario)
        .single();

      if (error) {
        throw error;
      }
      setDados(data);

    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados do estudante.');
      setDados(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.text}>Carregando dados...</Text>
      </View>
    );
  }

  if (!dados) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nenhum dado encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados Pessoais</Text>
      <Text style={styles.text}>Nome: {dados.nome} {dados.sobrenome}</Text>
      <Text style={styles.text}>CPF: {dados.cpf}</Text>
      <Text style={styles.text}>Instituição: {dados.instituicao}</Text>
      <Text style={styles.text}>Curso: {dados.curso}</Text>
      <Text style={styles.text}>Nascimento: {dados.data_nascimento}</Text>
      <Text style={styles.text}>Gênero: {dados.genero}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A8A' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  text: { fontSize: 16, color: 'white', marginBottom: 5 }
});