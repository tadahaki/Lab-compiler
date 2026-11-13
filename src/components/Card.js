import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function Card({ children, style }) {
  const { colors } = useApp();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, style]}>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({ card: { borderRadius: 14, borderWidth: 1, padding: 16 } });
