import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import { supabase } from '../services/supabase';

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [habilitar, setHabilitar] = useState(true);

  useEffect(() => {
    buscarNoticias();
  }, []);

  const buscarNoticias = async () => {
    const { data, error } = await supabase
      .from('noticias')
      .select('*')
      .order('data', { ascending: false });

    if (!error) setNoticias(data);
    else console.log(error);
  };

  // Função para calcular rótulo relativo (Hoje, Ontem, Semana Passada...)
  const getRotulo = (dataISO) => {
    const hoje = new Date();
    const data = new Date(dataISO);

    const diff = Math.floor((hoje - data) / (1000 * 60 * 60 * 24)); // diferença em dias

    if (diff === 0) return "Hoje";
    if (diff === 1) return "Ontem";
    if (diff <= 7) return "Semana Passada";
    return data.toLocaleDateString("pt-BR");
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>{getRotulo(item.data)}</Text>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.desc}>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Habilitar notificações</Text>
        <Switch
          value={habilitar}
          onValueChange={setHabilitar}
          thumbColor={habilitar ? "#FFF" : "#FFF"}
          trackColor={{ false: "#ccc", true: "red" }}
        />
      </View>

      <FlatList
        data={noticias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEE2E2',
    padding: 12,
    margin: 15,
    borderRadius: 10,
  },
  toggleText: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  card: {
    backgroundColor: '#F1F5F9',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  label: { fontSize: 16, fontWeight: 'bold', color: 'red', marginBottom: 5 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  desc: { fontSize: 14, color: '#444' },
});