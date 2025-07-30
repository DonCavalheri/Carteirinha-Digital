import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Calendario() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendário</Text>
      <Text style={styles.text}>Eventos e provas aparecerão aqui.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A8A' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  text: { fontSize: 16, color: 'white' },
});