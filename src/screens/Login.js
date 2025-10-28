import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { supabase } from '../services/supabase';

export default function Login({ navigation }) {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para o "olhinho"
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!cpf || !senha) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }

        setLoading(true);

        try {
            // 1. Mapear CPF para Email
            const { data: estudante, error: fetchError } = await supabase
                .from('estudantes')
                .select('email')
                .eq('cpf', cpf)
                .single();

            if (fetchError || !estudante) {
                Alert.alert('Erro de Login', 'CPF ou Senha incorretos. Por favor, verifique os dados.');
                setLoading(false);
                return;
            }

            const email = estudante.email;

            // 2. Usar o Supabase Auth para fazer o login com Email e Senha
            const { error: authError } = await supabase.auth.signInWithPassword({
                email: email,
                password: senha,
            });

            if (authError) {
                Alert.alert('Erro de Login', 'CPF ou Senha incorretos. Por favor, tente novamente.');
                setLoading(false);
                return;
            }

            // 3. Sucesso
            navigation.replace('HomeTabs', { cpf });

        } catch (err) {
            console.error(err);
            Alert.alert('Erro inesperado', 'Ocorreu um erro durante o processo de login. Tente novamente.');
        } finally {
            setLoading(false);
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
                        editable={!loading}
                    />
                </View>

                {/* Senha */}
                <View style={styles.inputContainer}>
                    <Icon name="lock-closed-outline" size={22} color="#999" style={styles.icon} />
                    <TextInput 
                        placeholder="Senha" 
                        style={styles.input} 
                        secureTextEntry={!showPassword} // Controlado pelo estado
                        value={senha} 
                        onChangeText={setSenha} 
                        placeholderTextColor="#999"
                        editable={!loading}
                    />
                    {/* Ícone "olhinho" */}
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={loading}>
                        <Icon name={showPassword ? "eye-outline" : "eye-off-outline"} size={22} color="#999" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword} disabled={loading}>
                    <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Acessar</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.footerLinks}>
                    <Text style={styles.linkText}>☐ Lembrar de mim</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} disabled={loading}>
                        <Text style={[styles.linkText, { color: '#B91C1C', fontWeight: 'bold' }]}>Criar conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#365370ff' },
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