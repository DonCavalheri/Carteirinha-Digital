import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function CustomInput({ placeholder, value, onChangeText, secureTextEntry }) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.card,
    width: '90%',
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
    marginVertical: 8,
    fontSize: theme.font.text,
    color: theme.colors.textDark,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
});