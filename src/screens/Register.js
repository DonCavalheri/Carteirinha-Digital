import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, ActivityIndicator } from 'react-native';
import { supabase } from '../services/supabase';
import { Ionicons as Icon } from '@expo/vector-icons'; 
export default function Register({ navigation }) {
    const [nome, setNome] = useState(''); // Nome
    const [sobrenome, setSobrenome] = useState(''); // Sobrenome
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [repetirSenha, setRepetirSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para o "olhinho"
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!nome || !sobrenome || !cpf || !email || !senha || !repetirSenha) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }
        if (senha !== repetirSenha) {
            Alert.alert('Erro', 'As senhas não coincidem!');
            return;
        }
        
        setLoading(true);

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: senha,
                options: {
                    data: { nome_completo: `${nome} ${sobrenome}` }, 
                }
            });

            if (authError) {
                Alert.alert('Erro no Cadastro', authError.message);
                setLoading(false);
                return;
            }
            
            const userId = authData.user.id;
            const { error: profileError } = await supabase
                .from('estudantes')
                .insert([
                    { 
                        nome: nome, 
                        sobrenome: sobrenome, 
                        cpf: cpf, 
                        email: email, 
                        auth_uid: userId 
                    }
                ]);

            if (profileError) {
                Alert.alert('Erro ao Salvar Perfil', 'Conta criada, mas houve um erro ao salvar os dados. Tente fazer login.');
                setLoading(false);
                return;
            }

            Alert.alert('Sucesso', 'Conta criada! Você já pode fazer login.');
            navigation.navigate('Login');

        } catch (error) {
            console.error(error);
            Alert.alert('Erro inesperado', 'Ocorreu um erro durante o cadastro. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} disabled={loading}>
                    <Icon name="arrow-back" size={28} color="#FFF" />
                </TouchableOpacity>
                <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            </View>

            <View style={styles.bottomContainer}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>Crie sua conta</Text>

                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Digite seu CPF" style={styles.input} keyboardType="numeric" value={cpf} onChangeText={setCpf} placeholderTextColor="#666" editable={!loading} />
                    </View>
                    
                    {/* Nome */}
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome} placeholderTextColor="#666" editable={!loading} />
                    </View>

                    {/* Sobrenome */}
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Sobrenome" style={styles.input} value={sobrenome} onChangeText={setSobrenome} placeholderTextColor="#666" editable={!loading} />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" value={email} onChangeText={setEmail} placeholderTextColor="#666" editable={!loading} />
                    </View>

                    {/* Senha com "olhinho" */}
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Senha" style={styles.input} secureTextEntry={!showPassword} value={senha} onChangeText={setSenha} placeholderTextColor="#666" editable={!loading} />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={loading}>
                            <Icon name={showPassword ? "eye-outline" : "eye-off-outline"} size={22} color="#999" />
                        </TouchableOpacity>
                    </View>

                    {/* Repetir Senha */}
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Repetir senha" style={styles.input} secureTextEntry={!showPassword} value={repetirSenha} onChangeText={setRepetirSenha} placeholderTextColor="#666" editable={!loading} />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Criar conta</Text>
                        )}
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