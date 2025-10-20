import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { supabase } from '../services/supabase';

export default function ForgotPassword({ navigation }) {
    const [cpf, setCpf] = useState('');

    const handleRecovery = async () => {
        if (!cpf) {
            Alert.alert('Erro', 'Digite seu CPF.');
            return;
        }

        const { data: estudante, error } = await supabase
            .from('estudantes')
            .select('cpf')
            .eq('cpf', cpf)
            .single();

        if (error || !estudante) {
            Alert.alert('Erro', 'CPF não encontrado.');
            return;
        }

        navigation.navigate('ResetPassword', { cpf });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={28} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Esqueceu a senha?</Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.problemTitle}>Digite seu CPF para redefinir</Text>
                <TextInput placeholder="CPF" style={styles.input} keyboardType="numeric" value={cpf} onChangeText={setCpf} />
                <TouchableOpacity style={styles.buttonRedefinir} onPress={handleRecovery}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonVoltar} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    header: { backgroundColor: '#2C3E50', paddingTop: 50, paddingBottom: 30, alignItems: 'center', justifyContent: 'center' },
    backButton: { position: 'absolute', left: 20, top: 50 },
    headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF' },
    body: { flex: 1, padding: 30, alignItems: 'center', backgroundColor: '#FFF' },
    problemTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
    input: { width: '100%', borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 12, marginBottom: 20 },
    buttonRedefinir: { width: '100%', backgroundColor: '#B91C1C', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
    buttonVoltar: { width: '100%', backgroundColor: '#1E3A8A', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#FFF', fontWeight: 'bold' },
});
