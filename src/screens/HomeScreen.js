import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import Card from '../components/Card';
import LabTile from '../components/LabTile';
import { useApp } from '../context/AppContext';
import { labs } from '../data/labs';

export default function HomeScreen({ navigation }) {
  const { colors, name, recentActivities } = useApp();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open settings"
          hitSlop={8}
          onPress={() => navigation.navigate('Settings')}
          style={({ pressed }) => [styles.settingsButton, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Feather name="settings" size={20} color={colors.accent} />
        </Pressable>
      ),
    });
  }, [colors.accent, navigation]);

  return (
    <ScreenContainer>
      <Card style={styles.welcome}>
        <Text style={[styles.hello, { color: colors.text }]}>Hello, {name}</Text>
        <Text style={{ color: colors.muted }}> BSCS 4A</Text>
      </Card>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Activities
        </Text>
      <View style={styles.grid}>
        {labs.map((lab) => (
          <LabTile key={lab.id} lab={lab} onPress={() => navigation.navigate(lab.screen)} />
        ))}
      </View>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent activity</Text>
      <Card style={styles.activityCard}>
        {recentActivities.length ? recentActivities.slice(0, 5).map((activity, index) => (
          <View key={activity.id} style={styles.activityRow}>
            <View style={[styles.activityDot, { backgroundColor: colors.accent }]} />
            <View style={styles.activityCopy}>
              <Text style={[styles.activityTitle, { color: colors.text }]}>{activity.message}</Text>
              <Text style={{ color: colors.muted, fontSize: 12 }}>{formatActivityTime(activity.createdAt)}</Text>
            </View>
          </View>
        )) : <Text style={{ color: colors.muted }}>Your recent app activity will appear here.</Text>}
      </Card>
    </ScreenContainer>
  );
}
function formatActivityTime(value) {
  const date = new Date(value);
  return `${date.toLocaleDateString()} · ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
}
const styles = StyleSheet.create({
  welcome: { marginBottom: 16 },
  activityCard: { marginBottom: 24, gap: 12 },
  activityRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 4 },
  activityDot: { width: 8, height: 8, borderRadius: 4 },
  activityCopy: { flex: 1, gap: 3 },
  activityTitle: { fontWeight: '600', fontSize: 15 },
  hello: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  sectionTitle: {
  fontSize: 18,
  fontWeight: '400',
  marginBottom: 12,
  paddingLeft: 4,
},
  settingsButton: { width: 50, height: 40, alignItems: 'center', justifyContent: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', marginBottom: 20 },
});
