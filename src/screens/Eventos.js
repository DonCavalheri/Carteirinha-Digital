import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../services/supabase';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect

export default function Eventos({ navigation }) {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            
            // 1. Obter a sessão e o ID do usuário
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                Alert.alert('Erro', 'Usuário não autenticado.');
                setLoading(false);
                return;
            }
            const currentUserId = session.user.id;
            setUserId(currentUserId);

            // 2. Buscar todos os eventos
            const { data: eventosData, error: eventosError } = await supabase
                .from('eventos')
                .select('*')
                .order('data', { ascending: true });

            if (eventosError) throw eventosError;

            // 3. Buscar ingressos obtidos pelo usuário
            const { data: ingressosObtidosData, error: ingressosObtidosError } = await supabase
                .from('ingressos_obtidos')
                .select('evento_id')
                .eq('user_id', currentUserId);

            if (ingressosObtidosError) throw ingressosObtidosError;

            // 4. Mapear os eventos para incluir o status do ingresso
            // Como evento_id é bigint, garantimos que a comparação seja feita corretamente
            const obtidosMap = new Set(ingressosObtidosData.map(i => i.evento_id));
            
            const eventosComStatus = eventosData.map(evento => ({
                ...evento,
                ingressoObtido: obtidosMap.has(evento.id)
            }));

            setEventos(eventosComStatus);

        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
            Alert.alert('Erro', 'Não foi possível carregar a lista de eventos.');
        } finally {
            setLoading(false);
        }
    };
    
    // Recarrega a lista sempre que a tela for focada (após adquirir um ingresso)
    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E40AF" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Próximos Eventos</Text>
            {eventos.map((evento) => (
                <View key={evento.id} style={styles.card}>
                    <Text style={styles.cardTitle}>{evento.nome}</Text>
                    <Text style={styles.cardText}>Data: {new Date(evento.data).toLocaleDateString()}</Text>
                    <Text style={styles.cardText}>Local: {evento.local}</Text>
                    
                    <TouchableOpacity
                        style={[
                            styles.button,
                            evento.ingressoObtido ? styles.buttonObtido : styles.buttonObter
                        ]}
                        onPress={() => navigation.navigate('DetalhesIngresso', { 
                            eventoId: evento.id, 
                            eventoNome: evento.nome,
                            ingressoObtido: evento.ingressoObtido,
                            userId: userId
                        })}
                    >
                        <Text style={styles.buttonText}>
                            {evento.ingressoObtido ? 'Ingresso Obtido' : 'Obter Ingresso'}
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5', padding: 10 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, color: '#1E40AF' },
    card: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#333' },
    cardText: { fontSize: 14, color: '#555' },
    button: { padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
    buttonObter: { backgroundColor: '#B91C1C' }, // Vermelho para Obter
    buttonObtido: { backgroundColor: '#1E40AF' }, // Azul para Obtido
    buttonText: { color: '#FFF', fontWeight: 'bold' },
});