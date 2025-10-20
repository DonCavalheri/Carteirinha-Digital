import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { supabase } from '../services/supabase';

export default function Login({ navigation }) {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!cpf || !senha) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }

        try {
            // Busca estudante pelo CPF
            const { data: estudante, error } = await supabase
                .from('estudantes')
                .select('*')
                .eq('cpf', cpf)
                .single();

            if (error || !estudante) {
                Alert.alert('Erro', 'CPF não encontrado.');
                return;
            }

            if (estudante.senha !== senha) {
                Alert.alert('Erro', 'Senha incorreta.');
                return;
            }

            // Sucesso
            navigation.replace('HomeTabs', { cpf });
        } catch (err) {
            Alert.alert('Erro inesperado', err.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.title}>Login</Text>

                {/* CPF */}
                <View style={styles.inputContainer}>
                    <Icon name="card-outline" size={22} color="#999" style={styles.icon} />
                    <TextInput 
                        placeholder="CPF" 
                        style={styles.input} 
                        keyboardType="numeric" 
                        value={cpf} 
                        onChangeText={setCpf} 
                        placeholderTextColor="#999"
                    />
                </View>

                {/* Senha */}
                <View style={styles.inputContainer}>
                    <Icon name="lock-closed-outline" size={22} color="#999" style={styles.icon} />
                    <TextInput 
                        placeholder="Senha" 
                        style={styles.input} 
                        secureTextEntry={!showPassword} 
                        value={senha} 
                        onChangeText={setSenha} 
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon name={showPassword ? "eye-outline" : "eye-off-outline"} size={22} color="#999" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
                    <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <View style={styles.footerLinks}>
                    <Text style={styles.linkText}>☐ Lembrar de mim</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={[styles.linkText, { color: '#B91C1C', fontWeight: 'bold' }]}>Criar conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#2C3E50' },
    topContainer: { flex: 1.5, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20 },
    logo: { width: 120, height: 120 },
    bottomContainer: {
        flex: 3,
        backgroundColor: '#F5F5F5',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 40,
        paddingHorizontal: 30,
    },
    title: { fontSize: 32, fontWeight: 'bold', color: '#1E40AF', marginBottom: 30, textAlign: 'center' },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        borderRadius: 30,
        paddingHorizontal: 15,
        marginBottom: 20,
        height: 55,
    },
    icon: { marginRight: 10, color: '#999' },
    input: { flex: 1, height: '100%', fontSize: 16, color: '#333' },
    forgotPassword: { alignSelf: 'flex-start', marginBottom: 10 },
    forgotText: { color: '#1E40AF', fontSize: 14, textDecorationLine: 'underline' },
    button: {
        backgroundColor: '#B91C1C',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
        height: 55,
        justifyContent: 'center',
    },
    buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    footerLinks: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
    linkText: { color: '#666', fontSize: 14 },
});