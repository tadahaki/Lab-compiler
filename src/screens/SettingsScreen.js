import React, { useState } from 'react';
import { Alert, Text, TextInput, Switch, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme, name, setName, logActivity } = useApp();
  const [draftName, setDraftName] = useState(name);

  const saveName = () => {
    const nextName = draftName.trim();
    if (!nextName) {
      Alert.alert('Name required', 'Please enter a profile name before saving.');
      return;
    }
    const changed = nextName !== name;
    setName(nextName);
    setDraftName(nextName);
    if (changed) logActivity(`Updated profile name to ${nextName}`);
    Alert.alert('Name saved', `Your profile name is now ${nextName}.`);
  };

  return (
    <ScreenContainer>
      <Card style={styles.card}>
        <Text style={[styles.label, { color: colors.text }]}>Profile name</Text>
        <TextInput
          value={draftName}
          onChangeText={setDraftName}
          placeholder="Your name"
          placeholderTextColor={colors.muted}
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        />
        <AppButton label="Save " onPress={saveName} style={styles.saveButton} />
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
  saveButton: { marginTop: 12, alignSelf: 'flex-end', width: 80},
});
 