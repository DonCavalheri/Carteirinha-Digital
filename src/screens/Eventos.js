import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { supabase } from '../services/supabase';

export default function Eventos() {
  const [eventos, setEventos] = useState([]);

  const buscarEventos = async () => {
    const { data, error } = await supabase.from('eventos').select('*');
    if (!error) setEventos(data);
  };

  useEffect(() => {
    buscarEventos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.eventTitle}>{item.nome}</Text>
      <Text style={styles.eventText}>{item.local} - {new Date(item.data).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.text}>Nenhum evento encontrado</Text>}
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