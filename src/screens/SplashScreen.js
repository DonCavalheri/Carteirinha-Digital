import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={{ width: 120, height: 120, marginBottom: 20 }} />
      <Text style={styles.title}>C E D </Text>
      <Text style={styles.subtitle}>Carteirinha de Estudante Digital</Text>
      <CustomButton title="Acessar" onPress={() => navigation.navigate('Login')} />
      <Text>
      {'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}
      </Text>
      <Image source={require('../../assets/banner.png')} style={{ width: 330, height: 90, marginBottom: 20 }} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfcff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20
  }
});