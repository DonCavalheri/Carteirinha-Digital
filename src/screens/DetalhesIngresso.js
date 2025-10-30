import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../services/supabase';
import { FontAwesome } from '@expo/vector-icons';

export default function DetalhesIngresso({ route, navigation }) {
    // Recebe os parâmetros da tela anterior (Eventos.js)
    const { eventoId, eventoNome, ingressoObtido: initialIngressoObtido, userId } = route.params;
    
    const [ingressoObtido, setIngressoObtido] = useState(initialIngressoObtido);
    const [loading, setLoading] = useState(false);

    const handleObterIngresso = async () => {
        if (ingressoObtido) return; // Já obteve, não faz nada

        setLoading(true);
        try {
            // Insere o registro na tabela ingressos_obtidos
            // eventoId é um bigint (número)
            const { error } = await supabase
                .from('ingressos_obtidos')
                .insert([{ user_id: userId, evento_id: eventoId }]);

            if (error) throw error;

            Alert.alert('Sucesso!', `Ingresso para ${eventoNome} adquirido gratuitamente.`);
            setIngressoObtido(true);
            
        } catch (error) {
            console.error('Erro ao obter ingresso:', error);
            // O erro 23505 é o de violação de UNIQUE (usuário já tem ingresso)
            if (error.code === '23505') {
                 Alert.alert('Erro', 'Você já possui um ingresso para este evento.');
                 setIngressoObtido(true); // Atualiza o estado local
            } else {
                 Alert.alert('Erro', 'Não foi possível adquirir o ingresso. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerIngresso = () => {
        // Navega para a tela de Ingressos, que listará todos os ingressos obtidos
        navigation.navigate('Ingressos');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do Ingresso</Text>
            <Text style={styles.eventoNome}>{eventoNome}</Text>

            {loading && <ActivityIndicator size="small" color="#1E40AF" style={{ marginVertical: 10 }} />}

            {ingressoObtido ? (
                <View style={styles.confirmationBox}>
                    <FontAwesome name="check-circle" size={50} color="#1E40AF" />
                    <Text style={styles.confirmationText}>Ingresso já adquirido!</Text>
                    <Text style={styles.confirmationSubText}>Você pode visualizar o ingresso na sua lista.</Text>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonVer]}
                        onPress={handleVerIngresso}
                    >
                        <Text style={styles.buttonText}>Ver Ingresso</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text style={styles.infoText}>
                        Obtenha seu ingresso gratuitamente utilizando sua carteirinha de estudante digital.
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonObter]}
                        onPress={handleObterIngresso}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Adquirindo...' : 'Obter Ingresso Gratuito'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    eventoNome: { fontSize: 18, marginBottom: 20, color: '#555' },
    infoText: { fontSize: 16, marginBottom: 30, color: '#333' },
    confirmationBox: { alignItems: 'center', padding: 20, borderRadius: 10, backgroundColor: '#E0F7FA' },
    confirmationText: { fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#1E40AF' },
    confirmationSubText: { fontSize: 14, marginVertical: 10, color: '#555' },
    button: { padding: 12, borderRadius: 5, marginTop: 15, width: '100%', alignItems: 'center' },
    buttonObter: { backgroundColor: '#B91C1C' },
    buttonVer: { backgroundColor: '#1E40AF' },
    buttonText: { color: '#FFF', fontWeight: 'bold' },
});