import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Image, ScrollView } from 'react-native';
import { supabase } from '../services/supabase';
import { FontAwesome } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg'; 

export default function Credencial() {
    const [estudante, setEstudante] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEstudante = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    Alert.alert('Erro', 'Usuário não autenticado.');
                    setLoading(false);
                    return;
                }

                const { data, error } = await supabase
                    .from('estudantes')
                    .select('nome, sobrenome, cpf, curso, instituicao, validade, foto_url, auth_uid') 
                    .eq('auth_uid', user.id)
                    .single();

                if (error) throw error;

                setEstudante(data);

            } catch (error) {
                console.error('Erro ao buscar dados do estudante:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados da credencial.');
            } finally {
                setLoading(false);
            }
        };

        fetchEstudante();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E40AF" />
            </View>
        );
    }

    if (!estudante) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Dados do estudante não encontrados.</Text>
            </View>
        );
    }

    const nomeCompleto = `${estudante.nome || ''} ${estudante.sobrenome || ''}`.trim();

    const dadosCredencial = [
        { label: 'Nome Completo', value: nomeCompleto || 'N/A' },
        { label: 'CPF', value: estudante.cpf },
        { label: 'Curso', value: estudante.curso || 'N/A' },
        { label: 'Instituição', value: estudante.instituicao || 'Etec Rodrigues de Abreu' },
        { label: 'Validade', value: estudante.validade || '12/2025' },
    ];

    const qrValue = estudante.cpf || estudante.auth_uid; 

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.credencialCard}>
                
                <View style={styles.photoArcContainer}>
                    <View style={styles.photoContainer}>
                        {estudante.foto_url ? (
                            <Image source={{ uri: estudante.foto_url }} style={styles.profileImage} />
                        ) : (
                            <FontAwesome name="user-circle" size={100} color="#DDD" />
                        )}
                    </View>
                </View>

                <View style={styles.dataSection}>
                    {dadosCredencial.map((item, index) => (
                        <View key={index} style={styles.dataItem}>
                            <Text style={styles.label}>{item.label}:</Text>
                            <View style={styles.valueBox}>
                                <Text style={styles.value}>{item.value}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.qrContainer}>
                    <Text style={styles.qrLabel}>QR Code:</Text>
                    <QRCode
                        value={qrValue}
                        size={200}
                        color="#000"
                        backgroundColor="#FFF"
                    />
                </View>

                <Text style={styles.footerText}>Documento Oficial - Lei Federal 12.933/13</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingVertical: 20,
    },
    credencialCard: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    
    photoArcContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 5,
        borderColor: '#2141acff', 
        padding: 5,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    photoContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 55,
        overflow: 'hidden',
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },

    dataSection: {
        width: '100%',
        marginBottom: 20,
    },
    dataItem: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#B91C1C', 
        marginBottom: 5,
    },
    valueBox: {
        backgroundColor: '#F3F4F6', 
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },

    // QR Code
    qrContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    qrLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E40AF',
        marginBottom: 10,
    },

    footerText: {
        fontSize: 12,
        color: '#999',
        marginTop: 10,
    },
});