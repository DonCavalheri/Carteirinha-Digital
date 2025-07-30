import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={{ width: 120, height: 120, marginBottom: 20 }} />
      <Text style={styles.title}>ESTUDA ETEC</Text>
      <Text style={styles.subtitle}>Carteirinha de Estudante</Text>
      <CustomButton title="Acessar" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20
  }
});