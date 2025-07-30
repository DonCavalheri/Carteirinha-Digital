import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '../services/supabase';
import { salvarCache, lerCache } from '../services/cache.js';

export default function Credencial() {
  const [dados, setDados] = useState(null);

  const buscarDados = async () => {
    // Tenta buscar online
    const { data: user } = await supabase.auth.getUser();
    if (user?.user) {
      const { data, error } = await supabase
        .from('estudantes')
        .select('*')
        .eq('id', user.user.id)
        .single();

      if (!error && data) {
        setDados(data);
        salvarCache('credencial', data); // Salva offline
        return;
      }
    }

    // Se falhar, usa cache
    const offline = await lerCache('credencial');
    if (offline) setDados(offline);
  };

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <View style={styles.container}>
      {dados ? (
        <>
          <Text style={styles.title}>{dados.nome} {dados.sobrenome}</Text>
          <Text style={styles.text}>CPF: {dados.cpf}</Text>
          <Text style={styles.text}>Instituição: {dados.instituicao}</Text>
          <Text style={styles.text}>Validade: {dados.validade}</Text>
        </>
      ) : (
        <Text style={styles.text}>Carregando credencial...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A8A' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 10 },
  text: { fontSize: 16, color: 'white' }
});
