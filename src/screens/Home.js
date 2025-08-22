import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomCard from '../components/CustomCard';
import { theme } from '../theme';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao CED</Text>
      <CustomCard title="Credencial" subtitle="Veja sua carteirinha" />
      <CustomCard title="Eventos" subtitle="Próximos eventos disponíveis" />
      <CustomCard title="Ingressos" subtitle="Confira seus ingressos" />
      <CustomCard title="Dados" subtitle="Veja seus dados de estudante" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary, padding: theme.spacing.md },
  title: { fontSize: theme.font.title, fontWeight: 'bold', color: theme.colors.textLight, marginBottom: 20 },
});