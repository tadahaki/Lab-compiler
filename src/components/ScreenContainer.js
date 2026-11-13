import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function ScreenContainer({ children }) {
  const { colors } = useApp();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={styles.content}
    >
      {children}
    </ScrollView>
  );
}
const styles = StyleSheet.create({ content: { padding: 16, flexGrow: 1 } });
