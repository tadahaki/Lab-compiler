import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';

// Local, screen-specific state with useState + useEffect.
export default function CounterScreen({ navigation }) {
  const { colors, logActivity } = useApp();
  const [count, setCount] = useState(0);

  useEffect(() => {
    navigation.setOptions({ title: `Lab 1 (${count})` });
  }, [count, navigation]);

  return (
    <ScreenContainer>
      <Card style={styles.center}>
        <Text style={[styles.count, { color: colors.accent }]}>{count}</Text>
        <View style={styles.row}>
          <AppButton label="-1" variant="outline" onPress={() => { setCount((c) => c - 1); logActivity('Decreased the Lab 1 counter'); }} style={styles.btn} />
          <AppButton label="+1" onPress={() => { setCount((c) => c + 1); logActivity('Increased the Lab 1 counter'); }} style={styles.btn} />
        </View>
        <AppButton label="Reset" variant="outline" onPress={() => { setCount(0); logActivity('Reset the Lab 1 counter'); }} style={{ alignSelf: 'stretch' }} />
      </Card>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  center: { alignItems: 'center', gap: 16 },
  count: { fontSize: 72, fontWeight: '800' },
  row: { flexDirection: 'row', gap: 12, alignSelf: 'stretch' },
  btn: { flex: 1 },
});
