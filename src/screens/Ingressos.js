import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { supabase } from '../services/supabase';

export default function Ingressos({ navigation }) {
  const [ingressos, setIngressos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarIngressos();
  }, []);

  const buscarIngressos = async () => {
    const { data, error } = await supabase
      .from('ingressos')
      .select(`
        id,
        tipo,
        status,
        eventos:evento_id (
          nome,
          local,
          data,
          imagem
        )
      `);

    if (!error) setIngressos(data || []);
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.eventos?.imagem && (
        <Image source={{ uri: item.eventos.imagem }} style={styles.img} />
      )}
      <Text style={styles.title}>{item.eventos?.nome}</Text>
      <Text>{item.eventos?.local}</Text>
      <Text>{item.eventos?.data}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DetalhesIngresso', { ingresso: item })}
      >
        <Text style={styles.buttonText}>Exibir</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#1E3A8A" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={ingressos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  card: {
    backgroundColor: '#F1F5F9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  img: { width: '100%', height: 150, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  button: {
    marginTop: 10,
    backgroundColor: '#1E3A8A',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});