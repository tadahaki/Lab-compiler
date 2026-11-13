import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function LabTile({ lab, onPress }) {
  const { colors } = useApp();
  const disabled = !lab.screen;
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.tile, { backgroundColor: colors.surface, borderColor: disabled ? colors.border : colors.accent }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>{lab.title}</Text>
      <Text style={{ color: colors.muted }}>{lab.subtitle}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  // flexBasis 45% + flexGrow gives a 2-column grid that reflows on any width
  tile: { flexGrow: 1, flexBasis: '45%', minHeight: 110, borderRadius: 14, borderWidth: 1.5, padding: 16, justifyContent: 'space-between' },
  title: { fontSize: 20, fontWeight: '700' },
});
