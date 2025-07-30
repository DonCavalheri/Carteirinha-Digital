import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { supabase } from '../services/supabase';

export default function Ingressos() {
  const [ingressos, setIngressos] = useState([]);

  const buscarIngressos = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (user?.user) {
      const { data, error } = await supabase
        .from('ingressos')
        .select('*, eventos(nome, local)')
        .eq('usuario_id', user.user.id);

      if (!error) setIngressos(data);
    }
  };

  useEffect(() => {
    buscarIngressos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.eventTitle}>{item.eventos.nome}</Text>
      <Text style={styles.eventText}>{item.eventos.local} - {item.tipo} ({item.status})</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Ingressos</Text>
      <FlatList
        data={ingressos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.text}>Nenhum ingresso encontrado</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E3A8A', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10 },
  eventTitle: { fontSize: 18, fontWeight: 'bold' },
  eventText: { fontSize: 14 },
  text: { color: 'white', textAlign: 'center' },
});