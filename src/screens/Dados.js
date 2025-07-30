import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '../services/supabase';

export default function Dados() {
  const [dados, setDados] = useState(null);

  const buscarDados = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (user?.user) {
      const { data, error } = await supabase
        .from('estudantes')
        .select('cpf, nome, sobrenome, instituicao, curso, data_nascimento, genero')
        .eq('id', user.user.id)
        .single();

      if (!error) setDados(data);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <View style={styles.container}>
      {dados ? (
        <>
          <Text style={styles.title}>Dados Pessoais</Text>
          <Text style={styles.text}>Nome: {dados.nome} {dados.sobrenome}</Text>
          <Text style={styles.text}>CPF: {dados.cpf}</Text>
          <Text style={styles.text}>Instituição: {dados.instituicao}</Text>
          <Text style={styles.text}>Curso: {dados.curso}</Text>
          <Text style={styles.text}>Nascimento: {dados.data_nascimento}</Text>
          <Text style={styles.text}>Gênero: {dados.genero}</Text>
        </>
      ) : (
        <Text style={styles.text}>Carregando dados...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A8A' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  text: { fontSize: 16, color: 'white', marginBottom: 5 }
});