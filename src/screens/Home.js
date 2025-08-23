import React from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet } from 'react-native';
import CustomCard from '../components/CustomCard';
import { theme } from '../theme';
=======
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
>>>>>>> 8ea0f58 (Estilização e telas)

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text style={styles.title}>Bem-vindo ao CED</Text>
      <CustomCard title="Credencial" subtitle="Veja sua carteirinha" />
      <CustomCard title="Eventos" subtitle="Próximos eventos disponíveis" />
      <CustomCard title="Ingressos" subtitle="Confira seus ingressos" />
      <CustomCard title="Dados" subtitle="Veja seus dados de estudante" />
=======
      {/* Topo azul */}
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <Icon name="person-circle-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Área branca */}
      <View style={styles.bottomContainer}>
        <Text style={styles.welcome}>Olá, Enzo</Text>

        {/* Ícones de serviços */}
        <View style={styles.servicesRow}>
          <View style={styles.serviceItem}>
            <Icon name="school-outline" size={40} color="#B91C1C" />
            <Text style={styles.serviceText}>Aprendizagem</Text>
          </View>
          <View style={styles.serviceItem}>
            <Icon name="shield-checkmark-outline" size={40} color="#B91C1C" />
            <Text style={styles.serviceText}>Validação</Text>
          </View>
          <View style={styles.serviceItem}>
            <Icon name="lock-closed-outline" size={40} color="#B91C1C" />
            <Text style={styles.serviceText}>Privacidade</Text>
          </View>
        </View>

        {/* Barra de busca */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Encontre serviços na CED"
            style={styles.searchInput}
          />
          <Icon name="search" size={22} color="#B91C1C" />
        </View>

        {/* Lista de opções */}
        <View style={styles.card}>
          <Option title="Carteirinha Offline" />
          <Option title="Calendário" />
          <Option title="Frequência Escolar" />
          <Option title="Suporte" />
        </View>
      </View>
>>>>>>> 8ea0f58 (Estilização e telas)
    </View>
  );
}

// Componente para item da lista
const Option = ({ title }) => (
  <View style={styles.optionRow}>
    <Text style={styles.optionText}>{title}</Text>
    <Icon name="chevron-forward" size={22} color="#B91C1C" />
  </View>
);

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: theme.colors.primary, padding: theme.spacing.md },
  title: { fontSize: theme.font.title, fontWeight: 'bold', color: theme.colors.textLight, marginBottom: 20 },
=======
  container: { flex: 1, backgroundColor: '#1E3A8A' },

  // Topo
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  profileButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },

  // Parte branca
  bottomContainer: {
    flex: 5,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 20,
  },

  // Serviços
  servicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceItem: { alignItems: 'center', flex: 1 },
  serviceText: {
    marginTop: 5,
    fontSize: 14,
    color: '#111',
    fontWeight: '500',
  },

  // Busca
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },

  // Lista
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    elevation: 3,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#1E40AF',
    fontWeight: '500',
  },
>>>>>>> 8ea0f58 (Estilização e telas)
});