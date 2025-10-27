import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Button, Alert } from 'react-native';
import { supabase } from '../services/supabase';
import QRCode from 'react-native-qrcode-svg';
import * as ImagePicker from 'expo-image-picker';

export default function Credencial() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCpf, setUserCpf] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        setLoading(true);
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('Erro ao obter a sessão:', sessionError);
          Alert.alert('Erro', 'Não foi possível carregar a sessão do usuário.');
          return;
        }

        if (session?.user) {
          const { data: estudanteData, error: estudanteError } = await supabase
            .from('estudantes')
            .select('cpf, auth_uid')
            .eq('auth_uid', session.user.id)
            .single();

          if (estudanteError || !estudanteData) {
            console.error("Erro ao buscar CPF do estudante:", estudanteError);
            Alert.alert('Erro', 'Não foi possível encontrar o CPF do usuário logado na base de dados.');
            return;
          }

          const cpfUsuario = estudanteData.cpf;
          setUserCpf(cpfUsuario);
          await buscarDados(cpfUsuario);
        }
      } catch (err) {
        console.error('Erro no useEffect:', err);
        Alert.alert('Erro', 'Ocorreu um erro inesperado ao carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    carregarUsuario();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: estudanteData, error: estudanteError } = await supabase
          .from('estudantes')
          .select('cpf, auth_uid')
          .eq('auth_uid', session.user.id)
          .single();

        if (estudanteError || !estudanteData) {
          console.error("Erro ao buscar CPF do estudante no onAuthStateChange:", estudanteError);
          Alert.alert('Erro', 'Não foi possível encontrar o CPF do usuário logado na base de dados após mudança de estado.');
          return;
        }
        const cpfUsuario = estudanteData.cpf;
        setUserCpf(cpfUsuario);
        await buscarDados(cpfUsuario);
      } else {
        setUserCpf(null);
        setDados(null);
        setLoading(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function buscarDados(cpf) {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('estudantes')
        .select('nome, sobrenome, instituicao, curso, validade, foto_url')
        .eq('cpf', cpf)
        .single();

      if (error) {
        throw error;
      }
      setDados(data);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setDados(null);
      Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados do estudante.');
    } finally {
      setLoading(false);
    }
  }

  async function atualizarFoto() {
    if (!userCpf) {
      Alert.alert('Erro', 'CPF do usuário não encontrado para atualizar a foto.');
      return;
    }

    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Você precisa permitir acesso à galeria.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) return;

      setUploading(true);

      const asset = result.assets[0];
      const response = await fetch(asset.uri);
      const blob = await response.blob();

      const filePath = `fotos/${userCpf}-${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from('fotos-estudantes')
        .upload(filePath, blob, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (uploadError) {
        console.error('Erro no upload:', uploadError);
        Alert.alert('Erro', 'Não foi possível atualizar a foto.');
        setUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('fotos-estudantes')
        .getPublicUrl(filePath);

      const fotoUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from('estudantes')
        .update({ foto_url: fotoUrl })
        .eq('cpf', userCpf);

      if (updateError) {
        console.error('Erro ao atualizar no banco:', updateError);
        Alert.alert('Erro', 'Não foi possível salvar a foto.');
        setUploading(false);
        return;
      }

      setDados({ ...dados, foto_url: fotoUrl });
      Alert.alert('Sucesso', 'Foto atualizada com sucesso!');
    } catch (err) {
      console.error("Erro inesperado:", err);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar a foto.');
    } finally {
      setUploading(false);
    }
  }

  function formatarValidade(dataStr) {
    if (!dataStr) return '';
    const data = new Date(dataStr);
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${mes}/${ano}`;
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!dados) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nenhum dado encontrado. Por favor, tente novamente mais tarde.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {dados.foto_url ? (
        <Image source={{ uri: dados.foto_url }} style={styles.foto} />
      ) : (
        <View style={styles.fotoPlaceholder} />
      )}
      <Button
        title={uploading ? "Atualizando..." : "Atualizar Foto"}
        onPress={atualizarFoto}
        disabled={uploading}
      />
      <Text style={styles.text}>Nome: {dados.nome} {dados.sobrenome}</Text>
      <Text style={styles.text}>Instituição: {dados.instituicao}</Text>
      <Text style={styles.text}>Curso: {dados.curso}</Text>
      <Text style={styles.text}>Validade: {formatarValidade(dados.validade)}</Text>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.text}>QR Code:</Text>
        {userCpf && <QRCode value={userCpf} size={120} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
  },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  fotoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    marginBottom: 15,
  },
});