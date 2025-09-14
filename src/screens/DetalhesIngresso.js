import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function DetalhesIngresso({ route }) {
  const { ingresso } = route.params;

  // Função para formatar a data
  const formatarData = (dataISO) => {
    if (!dataISO) return '';
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      {ingresso.evento?.imagem && (
        <Image source={{ uri: ingresso.evento.imagem }} style={styles.img} />
      )}
      <Text style={styles.title}>{ingresso.evento?.nome}</Text>
      <Text style={styles.info}>{ingresso.evento?.local}</Text>
      <Text style={styles.info}>{formatarData(ingresso.evento?.data)}</Text>
      <Text style={styles.info}>Tipo: {ingresso.tipo}</Text>
      <Text style={styles.info}>Status: {ingresso.status}</Text>

      <View style={styles.qrContainer}>
        <QRCode
          value={JSON.stringify({
            id: ingresso.id,
            evento: ingresso.evento?.nome,
            tipo: ingresso.tipo,
            status: ingresso.status,
          })}
          size={200}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20, alignItems: 'center' },
  img: { width: '100%', height: 200, borderRadius: 12, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 5 },
  qrContainer: { marginTop: 30, padding: 20, backgroundColor: '#F1F5F9', borderRadius: 12 },
});