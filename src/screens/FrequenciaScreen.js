import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { supabase } from "../services/supabase";

export default function FrequenciaScreen({ route }) {
  const cpf = route?.params?.cpf;
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("CPF recebido na tela de Frequência:", cpf);
    if (cpf) {
      buscarFrequencia();
    } else {
      setLoading(false);
    }
  }, [cpf]);

  async function buscarFrequencia() {
    const { data: freq, error } = await supabase
      .from("frequencia")
      .select(`
        status,
        aula_id,
        aulas (
          disciplina_id,
          disciplinas (nome),
          data
        )
      `)
      .eq("aluno_cpf", cpf);

    if (error) {
      console.log("Erro Supabase:", error);
      setLoading(false);
      return;
    }

    if (!freq || freq.length === 0) {
      setDados({
        totalAulas: 0,
        faltas: 0,
        presencas: 0,
        geral: 0,
        disciplinas: {}
      });
      setLoading(false);
      return;
    }

    let totalAulas = freq.length;
    let faltas = freq.filter(f => f.status === "falta").length;
    let presencas = freq.filter(f => f.status === "presente").length;

    let porDisciplina = {};
    freq.forEach(f => {
      const disc = f.aulas?.disciplinas?.nome ?? "Disciplina Desconhecida";
      if (!porDisciplina[disc]) {
        porDisciplina[disc] = { total: 0, presencas: 0 };
      }
      porDisciplina[disc].total++;
      if (f.status === "presente") porDisciplina[disc].presencas++;
    });

    setDados({
      totalAulas,
      faltas,
      presencas,
      geral: totalAulas > 0 ? (presencas / totalAulas * 100).toFixed(1) : 0,
      disciplinas: porDisciplina
    });

    setLoading(false);
  }

  if (loading) return <Text style={styles.msg}>Carregando...</Text>;
  if (!cpf) return <Text style={styles.msg}>⚠ Nenhum CPF recebido na navegação.</Text>;
  if (dados?.totalAulas === 0) return <Text style={styles.msg}>📌 Nenhuma frequência registrada ainda.</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Frequência</Text>

      <View style={styles.row}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Aulas Dadas</Text>
          <Text style={styles.value}>{dados.totalAulas}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Faltas</Text>
          <Text style={styles.valueRed}>{dados.faltas}</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Presença Geral:</Text>
      <Text style={styles.percent}>{dados.geral}%</Text>

      {Object.entries(dados.disciplinas).map(([disc, v]) => {
        let perc = (v.presencas / v.total * 100).toFixed(1);
        return (
          <View key={disc} style={styles.disciplinaBox}>
            <Text style={styles.disciplina}>{disc}: {perc}%</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  row: { flexDirection: "row", justifyContent: "space-around" },
  infoBox: { padding: 10, borderRadius: 8, backgroundColor: "#f2f2f2", alignItems: "center", width: "40%" },
  label: { fontSize: 16, color: "#333" },
  value: { fontSize: 18, color: "blue", fontWeight: "bold" },
  valueRed: { fontSize: 18, color: "red", fontWeight: "bold" },
  subtitle: { marginTop: 20, fontSize: 20, fontWeight: "bold" },
  percent: { fontSize: 22, color: "red", marginBottom: 10 },
  disciplinaBox: { marginTop: 10, padding: 10, borderBottomWidth: 1, borderColor: "#eee" },
  disciplina: { fontSize: 18 },
  msg: { textAlign: "center", marginTop: 50, fontSize: 16 }
});
