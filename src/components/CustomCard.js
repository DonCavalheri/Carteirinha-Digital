import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function CustomCard({ title, subtitle }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',
    elevation: 3,
  },
  title: {
    fontSize: theme.font.subtitle,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  subtitle: {
    fontSize: theme.font.small,
    color: '#6B7280',
    marginTop: 4,
  },
});