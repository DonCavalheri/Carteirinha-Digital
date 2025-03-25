import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
       <Image source={require('./assets/logo.png')} style={{ width: 100, height: 100 }} />
      <Text style={styles.title}>ESTUDA ETEC</Text>
      <Text style={styles.text}>Carteirinha de Estudante</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
}

function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} autoCapitalize="none" autoCorrect={false} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

function Register({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>
      <TextInput placeholder="Digite seu CPF" style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Nome completo" style={styles.input} autoCapitalize="words" />
      <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} autoCapitalize="none" autoCorrect={false} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

function ForgotPassword({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueceu a senha?</Text>
      <Text style={styles.text}>Problemas para entrar? Digite seu email para redefinir a senha.</Text>
      <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" keyboardType="email-address" />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Redefinir senha</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Voltar para o login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A8A' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  text: { fontSize: 16, color: 'white', textAlign: 'center', marginBottom: 10 },
  input: { backgroundColor: 'white', width: '90%', padding: 10, marginVertical: 5, borderRadius: 5 },
  button: { backgroundColor: '#EF4444', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  link: { color: 'white', marginTop: 10, textDecorationLine: 'underline' },
};