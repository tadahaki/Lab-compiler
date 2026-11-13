import React from 'react';
import { Text, TextInput, Switch, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme, name, setName } = useApp();
  return (
    <ScreenContainer>
      <Card style={styles.card}>
        <Text style={[styles.label, { color: colors.text }]}>Profile name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor={colors.muted}
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        />
      </Card>
      <Card style={[styles.card, styles.row]}>
        <Text style={[styles.label, { color: colors.text, marginBottom: 0 }]}>Dark theme</Text>
        <Switch value={isDark} onValueChange={toggleTheme} trackColor={{ true: colors.accent }} />
      </Card>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16 },
});
