import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { supabase } from "../services/supabase";

export default function CalendarioScreen() {
  const [eventos, setEventos] = useState([]);
  const [marcados, setMarcados] = useState({});

  useEffect(() => {
    buscarEventos();
  }, []);

  async function buscarEventos() {
    const { data, error } = await supabase
      .from("eventos_escolares")
      .select("*");

    if (error) {
      console.log("Erro ao carregar eventos:", error);
      return;
    }

    setEventos(data);

    let marcadosTemp = {};
    data.forEach(ev => {
      let inicio = new Date(ev.data_inicio);
      let fim = new Date(ev.data_fim);

      for (let d = new Date(inicio); d <= fim; d.setDate(d.getDate() + 1)) {
        let dataStr = d.toISOString().split("T")[0];
        marcadosTemp[dataStr] = {
          selected: true,
          marked: true,
          selectedColor: "green"
        };
      }
    });
    setMarcados(marcadosTemp);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Calendário</Text>
      <Calendar markedDates={marcados} />

      <View style={{ marginTop: 20 }}>
        {eventos.map(ev => (
          <View key={ev.id} style={styles.eventBox}>
            <Text style={styles.eventDate}>
              {new Date(ev.data_inicio).toLocaleDateString()} - {new Date(ev.data_fim).toLocaleDateString()}
            </Text>
            <Text style={styles.eventName}>{ev.titulo}</Text>
            <Text style={styles.eventDesc}>{ev.descricao}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  eventBox: { marginBottom: 15, padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 8 },
  eventDate: { fontSize: 16, fontWeight: "bold", color: "red" },
  eventName: { fontSize: 18 },
  eventDesc: { fontSize: 14, color: "#555" }
});