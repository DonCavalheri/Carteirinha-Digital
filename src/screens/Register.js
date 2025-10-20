import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { supabase } from '../services/supabase';

export default function Register({ navigation }) {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [repetirSenha, setRepetirSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        if (!nome || !cpf || !email || !senha || !repetirSenha) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }
        if (senha !== repetirSenha) {
            Alert.alert('Erro', 'As senhas não coincidem!');
            return;
        }

        try {
            const { error } = await supabase
                .from('estudantes')
                .insert([{ nome, cpf, email, senha }]);

            if (error) {
                Alert.alert('Erro', error.message);
                return;
            }

            Alert.alert('Sucesso', 'Conta criada! Agora faça login.');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Erro inesperado', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={28} color="#FFF" />
                </TouchableOpacity>
                <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            </View>

            <View style={styles.bottomContainer}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>Crie sua conta</Text>

                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Digite seu CPF" style={styles.input} keyboardType="numeric" value={cpf} onChangeText={setCpf} placeholderTextColor="#666" />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Nome completo" style={styles.input} value={nome} onChangeText={setNome} placeholderTextColor="#666" />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" value={email} onChangeText={setEmail} placeholderTextColor="#666" />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Senha" style={styles.input} secureTextEntry={!showPassword} value={senha} onChangeText={setSenha} placeholderTextColor="#666" />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Icon name={showPassword ? "eye-outline" : "eye-off-outline"} size={22} color="#999" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Repetir senha" style={styles.input} secureTextEntry={!showPassword} value={repetirSenha} onChangeText={setRepetirSenha} placeholderTextColor="#666" />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Criar conta</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#2C3E50' },
    topContainer: { flex: 1.2, justifyContent: 'center', alignItems: 'center', paddingTop: 50 },
    backButton: { position: 'absolute', left: 20, top: 50, zIndex: 10 },
    logo: { width: 100, height: 100 },
    bottomContainer: { flex: 4, backgroundColor: '#F5F5F5', borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingHorizontal: 30 },
    scrollContent: { paddingTop: 30, paddingBottom: 50 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1E40AF', marginBottom: 30, textAlign: 'center' },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 30, paddingHorizontal: 15, marginBottom: 15, height: 50, borderWidth: 1, borderColor: '#DDD' },
    input: { flex: 1, height: '100%', fontSize: 16 },
    button: { backgroundColor: '#B91C1C', padding: 15, borderRadius: 30, alignItems: 'center', marginTop: 20, height: 55, justifyContent: 'center' },
    buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});