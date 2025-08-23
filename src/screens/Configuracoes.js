import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../services/supabase';

export default function Configuracoes() {
  const [usuario, setUsuario] = useState(null);

  const carregarUsuario = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (user?.user) {
      const { data, error } = await supabase
        .from('estudantes')
        .select('*')
        .eq('id', user.user.id)
        .single();

      if (!error && data) {
        if (data.foto_url) {
          const { data: signedUrlData } = await supabase.storage
            .from('avatars')
            .createSignedUrl(data.foto_url, 60);
          data.foto_url = signedUrlData.signedUrl;
        }
        setUsuario(data);
      }
    }
  };

  useEffect(() => {
    carregarUsuario();
  }, []);

  const escolherFoto = async () => {
    if (!usuario) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      const ext = file.uri.split('.').pop();
      const filePath = `${usuario.id}.${ext}`;

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

      const { data: signedUrlData } = await supabase.storage
        .from('avatars')
        .createSignedUrl(filePath, 60);

      await supabase
        .from('estudantes')
        .update({ foto_url: filePath })
        .eq('id', usuario.id);

      setUsuario({ ...usuario, foto_url: signedUrlData.signedUrl });
      Alert.alert('Sucesso', 'Foto atualizada!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      {usuario && (
        <View style={styles.profile}>
          <Image
            source={{ uri: usuario.foto_url || 'https://www.gravatar.com/avatar/?d=mp' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{usuario.nome} {usuario.sobrenome}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={escolherFoto}>
        <Text style={styles.buttonText}>Alterar Foto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1E3A8A' },
  profile: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 10, backgroundColor: '#E5E7EB' },
  name: { fontSize: 18, fontWeight: '600', color: '#111827' },
  button: { backgroundColor: '#B91C1C', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});