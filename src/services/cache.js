import AsyncStorage from '@react-native-async-storage/async-storage';

export const salvarCache = async (chave, valor) => {
  try {
    await AsyncStorage.setItem(chave, JSON.stringify(valor));
  } catch (error) {
    console.error('Erro ao salvar no cache:', error);
  }
};

export const lerCache = async (chave) => {
  try {
    const json = await AsyncStorage.getItem(chave);
    return json != null ? JSON.parse(json) : null;
  } catch (error) {
    console.error('Erro ao ler do cache:', error);
    return null;
  }
};
