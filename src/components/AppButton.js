import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function AppButton({ label, onPress, variant = 'solid', style }) {
  const { colors } = useApp();
  const solid = variant === 'solid';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: solid ? colors.accent : 'transparent', borderColor: colors.accent, opacity: pressed ? 0.8 : 1 },
        style,
      ]}
    >
      <Text style={[styles.label, { color: solid ? colors.onAccent : colors.accent }]}>{label}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btn: { paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 16, fontWeight: '600' },
});
