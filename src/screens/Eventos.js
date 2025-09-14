import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { supabase } from "../services/supabase";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);

  const buscarEventos = async () => {
    const { data, error } = await supabase.from("eventos").select("*");
    if (!error) setEventos(data);
  };

  useEffect(() => {
    buscarEventos();
  }, []);

  const formatarData = (data) => {
    const d = new Date(data);
    return d.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* (Se tiver imagem no banco pode renderizar aqui com <Image />) */}
      {/* <Image source={{ uri: item.imagem }} style={styles.img} /> */}

      <View style={styles.info}>
        <Text style={styles.data}>{formatarData(item.data)}</Text>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.local}>{item.local}</Text>

        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaoTexto}>Obter Ingressos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.text}>Nenhum evento encontrado</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
  },
  info: { flex: 1 },
  data: { color: "red", fontWeight: "bold", fontSize: 14 },
  nome: { fontSize: 18, fontWeight: "bold", marginVertical: 2 },
  local: { fontSize: 14, color: "#444", marginBottom: 8 },
  botao: {
    backgroundColor: "#E53935",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
  text: { textAlign: "center", color: "#888", marginTop: 20 },
  img: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
});
