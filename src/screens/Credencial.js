import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../services/supabase';
import { salvarCache, lerCache } from '../services/cache';
import QRCode from 'react-native-qrcode-svg';

export default function Credencial() {
  const [dados, setDados] = useState(null);

  const buscarDados = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (user?.user) {
      const { data, error } = await supabase
        .from('estudantes')
        .select('*')
        .eq('id', user.user.id)
        .single();

      if (!error && data) {
        // Se houver foto, gera URL assinada
        if (data.foto_url) {
          const { data: signedUrlData } = await supabase
            .storage
            .from('avatars')
            .createSignedUrl(data.foto_url, 60); // URL válida por 60 segundos
          data.foto_url = signedUrlData.signedUrl;
        }

        setDados(data);
        salvarCache('credencial', data);
        return;
      }
    }

    const offline = await lerCache('credencial');
    if (offline) setDados(offline);
  };

  useEffect(() => {
    buscarDados();
  }, []);

  const escolherFoto = async () => {
    if (!dados) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      const ext = file.uri.split('.').pop();
      const filePath = `${dados.id}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, {
          uri: file.uri,
          type: 'image/jpeg',
          name: filePath,
        }, { upsert: true });

      if (uploadError) {
        Alert.alert('Erro', 'Não foi possível enviar a foto');
        return;
      }

      // Gera URL assinada
      const { data: signedUrlData } = await supabase.storage
        .from('avatars')
        .createSignedUrl(filePath, 60);

      // Atualiza path no banco
      await supabase
        .from('estudantes')
        .update({ foto_url: filePath })
        .eq('id', dados.id);

      setDados({ ...dados, foto_url: signedUrlData.signedUrl });
      Alert.alert('Sucesso', 'Foto atualizada!');
    }
  };

  return (
    <View style={styles.container}>
      {dados ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Credencial</Text>

          

          <Text style={styles.name}>{dados.nome} {dados.sobrenome}</Text>
          <Text style={styles.role}>Estudante</Text>

          <QRCode
            value={dados.id || '000000'}
            size={120}
            backgroundColor="white"
          />

          <Text style={styles.validade}>Validade nacional</Text>
          <Text style={styles.validadeDate}>{dados.validade || '29/12/2026'}</Text>

          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.loadingText}>Carregando credencial...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A8A' },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', width: '90%' },
  cardTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  avatarImg: { width: 100, height: 100, borderRadius: 50, marginBottom: 5, resizeMode: 'cover', backgroundColor: '#E5E7EB' },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  role: { fontSize: 16, color: '#1E90FF', marginBottom: 15 },
  validade: { fontSize: 14, marginTop: 15 },
  validadeDate: { fontSize: 14, fontWeight: 'bold', marginBottom: 20 },
  downloadButton: { backgroundColor: '#B91C1C', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  downloadText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  loadingText: { color: 'white', fontSize: 16 },
});