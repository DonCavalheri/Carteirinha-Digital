import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Switch } from 'react-native';
import { supabase } from '../services/supabase';
import { FontAwesome, MaterialIcons, Feather, Entypo } from '@expo/vector-icons';

export default function Configuracoes({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [biometria, setBiometria] = useState(false);

  const carregarUsuario = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (user?.user) {
      const { data, error } = await supabase
        .from('estudantes')
        .select('*')
        .eq('id', user.user.id)
        .single();

      if (!error && data) {
        setUsuario(data);
      }
    }
  };

  useEffect(() => {
    carregarUsuario();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigation.replace('Login');
    } else {
      Alert.alert('Erro', 'Não foi possível sair');
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações de conta</Text>

        <TouchableOpacity style={styles.button}>
          <FontAwesome name="user-circle" size={20} color="#B91C1C" style={styles.icon} />
          <Text style={styles.buttonText}>Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Feather name="key" size={20} color="#B91C1C" style={styles.icon} />
          <Text style={styles.buttonText}>Editar Senha</Text>
        </TouchableOpacity>
        
        <View style={styles.switchRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name="fingerprint" size={20} color="#B91C1C" style={styles.icon} />
            <Text style={styles.switchLabel}>Habilitar Biometria</Text>
          </View>
          <Switch
            value={biometria}
            onValueChange={setBiometria}
            trackColor={{ false: '#d1d5db', true: '#1E3A8A' }}
            thumbColor={'#f9fafb'}
          />
        </View>

        <TouchableOpacity style={[styles.button, styles.exitButton]} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.exitText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações e Suporte</Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Suporte')}
          >
          <Feather name="help-circle" size={20} color="#B91C1C" style={styles.icon} />
          <Text style={styles.buttonText}>Suporte</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button}>
          <Entypo name="text-document" size={20} color="#B91C1C" style={styles.icon} />
          <Text style={styles.buttonText}>Termos e Políticas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <FontAwesome name="share-alt" size={20} color="#B91C1C" style={styles.icon} />
          <Text style={styles.buttonText}>Redes Sociais</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1E3A8A', textAlign: 'center' },
  profile: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10, backgroundColor: '#E5E7EB' },
  name: { fontSize: 18, fontWeight: '600', color: '#111827' },

  section: { marginTop: 20, padding: 15, backgroundColor: '#fff', borderRadius: 12, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 10 },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: { marginRight: 10 },
  buttonText: { fontSize: 16, fontWeight: '500', color: '#111827' },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  switchLabel: { fontSize: 16, fontWeight: '500', color: '#111827', marginLeft: 5 },

  exitButton: { backgroundColor: '#B91C1C' },
  exitText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});