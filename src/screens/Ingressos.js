import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../services/supabase';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect

export default function Ingressos({ navigation }) {
    const [ingressos, setIngressos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchIngressos = async () => {
        try {
            setLoading(true);
            
            // Query corrigida para usar o alias 'evento' e garantir o JOIN
            const { data: ingressosData, error } = await supabase
                .from('ingressos_obtidos')
                .select(`
                    id,
                    obtido_em,
                    evento:eventos ( nome, data, local )
                `)
                .order('obtido_em', { ascending: false });

            if (error) throw error;

            // Mapeia os dados para uma estrutura mais simples
            const ingressosFormatados = ingressosData.map(item => ({
                id: item.id,
                obtidoEm: item.obtido_em,
                eventoNome: item.evento.nome,
                eventoData: item.evento.data,
                eventoLocal: item.evento.local,
            }));

            setIngressos(ingressosFormatados);

        } catch (error) {
            console.error('Erro ao buscar ingressos:', error);
            Alert.alert('Erro', 'Não foi possível carregar seus ingressos.');
        } finally {
            setLoading(false);
        }
    };

    // Recarrega a lista sempre que a tela for focada
    useFocusEffect(
        React.useCallback(() => {
            fetchIngressos();
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E40AF" />
            </View>
        );
    }

    if (ingressos.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <FontAwesome name="ticket" size={50} color="#555" />
                <Text style={styles.emptyText}>Nenhum ingresso encontrado no momento.</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Eventos')}
                >
                    <Text style={styles.buttonText}>Encontrar Ingressos</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Meus Ingressos</Text>
            {ingressos.map((ingresso) => (
                <View key={ingresso.id} style={styles.card}>
                    <Text style={styles.cardTitle}>{ingresso.eventoNome}</Text>
                    <Text style={styles.cardText}>Local: {ingresso.eventoLocal}</Text>
                    <Text style={styles.cardText}>Data: {new Date(ingresso.eventoData).toLocaleDateString()}</Text>
                    <Text style={styles.cardSubText}>Adquirido em: {new Date(ingresso.obtidoEm).toLocaleDateString()}</Text>
                    
                    {/* Botão de exemplo para ver detalhes/QR Code */}
                    <TouchableOpacity 
                        style={styles.buttonVer}
                        onPress={() => Alert.alert('Ingresso', `Detalhes do Ingresso ${ingresso.id}`)}
                    >
                        <Text style={styles.buttonText}>Ver Detalhes</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5', padding: 10 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { fontSize: 18, color: '#555', marginVertical: 15, textAlign: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, color: '#1E40AF' },
    card: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#333' },
    cardText: { fontSize: 14, color: '#555' },
    cardSubText: { fontSize: 12, color: '#999', marginTop: 5 },
    button: { padding: 12, borderRadius: 5, marginTop: 15, backgroundColor: '#B91C1C', alignItems: 'center' },
    buttonVer: { padding: 8, borderRadius: 5, marginTop: 10, backgroundColor: '#1E40AF', alignItems: 'center', width: '50%' },
    buttonText: { color: '#FFF', fontWeight: 'bold' },
});