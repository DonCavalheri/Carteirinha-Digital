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
        evento:eventos!fk_ingressos_evento (
          id,
          nome,
          local,
          data,
          imagem
        )
      `);

    if (error) {
      console.error("Erro ao buscar ingressos:", error);
    } else {
      console.log("Ingressos encontrados:", data);
      setIngressos(data || []);
    }
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.evento?.imagem && (
        <Image source={{ uri: item.evento.imagem }} style={styles.img} />
      )}
      <Text style={styles.title}>{item.evento?.nome}</Text>
      <Text>{item.evento?.local}</Text>
      <Text>{item.evento?.data}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DetalhesIngresso', { ingresso: item })}
      >
        <Text style={styles.buttonText}>Exibir</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#1E3A8A" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      {ingressos.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum ingresso encontrado</Text>
      ) : (
        <FlatList
          data={ingressos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 15 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  card: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, marginBottom: 15 },
  img: { width: '100%', height: 150, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  button: { marginTop: 10, backgroundColor: '#1E3A8A', padding: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});