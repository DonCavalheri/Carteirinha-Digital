import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Button, Alert } from 'react-native';
import { supabase } from '../services/supabase';
import QRCode from 'react-native-qrcode-svg';
// ImagePicker e decode/base-64 NÃO são mais necessários

export default function Credencial() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCpf, setUserCpf] = useState(null);

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
      // Busca apenas os dados necessários, incluindo foto_url
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

  // A função atualizarFoto FOI REMOVIDA

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
      {/* Exibe a foto do banco de dados (foto_url) */}
      {dados.foto_url ? (
        <Image source={{ uri: dados.foto_url }} style={styles.foto} />
      ) : (
        <View style={styles.fotoPlaceholder}>
          <Text>Sem Foto</Text>
        </View>
      )}

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
    justifyContent: 'center',
    alignItems: 'center',
  },
});