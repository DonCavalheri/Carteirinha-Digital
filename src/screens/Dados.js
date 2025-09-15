import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  if (!dados) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Nenhum dado encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dados Pessoais</Text>
        <View style={styles.iconPlaceholder}></View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{dados.nome}</Text>

        <Text style={styles.label}>Sobrenome:</Text>
        <Text style={styles.value}>{dados.sobrenome}</Text>

        <Text style={styles.label}>CPF:</Text>
        <Text style={styles.value}>{dados.cpf}</Text>

        <Text style={styles.label}>Data de nascimento:</Text>
        <Text style={styles.value}>{dados.data_nascimento}</Text>

        <Text style={styles.label}>Gênero:</Text>
        <Text style={styles.value}>{dados.genero}</Text>

        <Text style={styles.label}>Instituição:</Text>
        <Text style={styles.value}>{dados.instituicao}</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffffff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A8A' },
  loadingText: { color: 'white', fontSize: 16, marginTop: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#1E3A8A' },
  iconPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1E3A8A' },
  card: { backgroundColor: 'white', margin: 20, borderRadius: 15, padding: 20 },
  label: { color: 'red', fontWeight: 'bold', fontSize: 16, marginTop: 10 },
  value: { color: 'black', fontSize: 16, backgroundColor: '#F0F0F0', padding: 5, borderRadius: 5, marginTop: 3 },
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  footerItem: { color: 'red', fontWeight: 'bold' },
  footerItemActive: { color: '#1E3A8A', fontWeight: 'bold' },
});