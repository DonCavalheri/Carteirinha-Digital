import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const QR_SIZE = width * 0.6;

export default function DetalhesView({ route }) {
    const { ingresso } = route.params;

    const dataHora = new Date(ingresso.eventoData);
    const dataFormatada = dataHora.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    const horaFormatada = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const qrValue = ingresso.id.toString(); 

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{ingresso.eventoNome}</Text>

            <View style={styles.imageContainer}>
                {ingresso.eventoImagem ? (
                    <Image source={{ uri: ingresso.eventoImagem }} style={styles.eventImage} />
                ) : (
                    <View style={styles.noImage}>
                        <FontAwesome name="picture-o" size={50} color="#777" />
                        <Text style={styles.noImageText}>Evento sem foto</Text>
                    </View>
                )}
            </View>

            <View style={styles.detailsBox}>
                <View style={styles.detailItem}>
                    <FontAwesome name="calendar" size={20} color="#1E40AF" />
                    <Text style={styles.detailText}>{dataFormatada}</Text>
                </View>
                <View style={styles.detailItem}>
                    <FontAwesome name="clock-o" size={20} color="#1E40AF" />
                    <Text style={styles.detailText}>{horaFormatada}</Text>
                </View>
                <View style={styles.detailItem}>
                    <FontAwesome name="map-marker" size={20} color="#1E40AF" />
                    <Text style={styles.detailText}>{ingresso.eventoLocal}</Text>
                </View>
            </View>

            <View style={styles.qrContainer}>
                <QRCode
                    value={qrValue}
                    size={QR_SIZE}
                    color="#000"
                    backgroundColor="#FFF"
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.ticketCode}>CÓDIGO: {ingresso.id}</Text>
                <Text style={styles.studentTicket}>Ingresso estudante</Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1E40AF', marginBottom: 15, textAlign: 'center' },
   
    imageContainer: { marginBottom: 20, borderRadius: 10, overflow: 'hidden', backgroundColor: '#FFF', elevation: 3 },
    eventImage: { width: '100%', height: 200, resizeMode: 'cover' },
    noImage: { height: 200, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DDD' },
    noImageText: { color: '#777', marginTop: 10, fontSize: 16 },

    detailsBox: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 20, elevation: 3 },
    detailItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    detailText: { fontSize: 16, marginLeft: 10, color: '#333' },

    qrContainer: { alignItems: 'center', padding: 20, backgroundColor: '#FFF', borderRadius: 10, marginBottom: 20, elevation: 3 },

    footer: { alignItems: 'center' },
    ticketCode: { fontSize: 14, color: '#555', marginBottom: 5 },
    studentTicket: { fontSize: 18, fontWeight: 'bold', color: '#B91C1C', marginTop: 5 }, // Vermelho
});
