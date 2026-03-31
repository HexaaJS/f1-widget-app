import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLastRace } from '../../src/hooks/useF1Query';
import { Colors } from '../../src/constants/colors';

function PodiumColor(position: string) {
  switch (position) {
    case '1': return Colors.podium.gold;
    case '2': return Colors.podium.silver;
    case '3': return Colors.podium.bronze;
    default:  return Colors.f1White;
  }
}

export default function LastRace() {
  const { data, isLoading, error } = useLastRace();

  if (isLoading) return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.muted}>Chargement...</Text>
    </SafeAreaView>
  );

  if (error || !data) return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.muted}>Données indisponibles</Text>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.label}>Dernière course</Text>
          <Text style={styles.raceName}>{data.raceName}</Text>
        </View>

        {/* Podium top 3 */}
        <View style={styles.podium}>
          {data.results.slice(0, 3).map((r: any) => (
            <View key={r.Driver.driverId} style={styles.podiumCard}>
              <Text style={[styles.podiumPos, { color: PodiumColor(r.position) }]}>
                P{r.position}
              </Text>
              <Text style={styles.podiumName}>{r.Driver.familyName}</Text>
              <Text style={styles.podiumTeam}>{r.Constructor.name}</Text>
              <Text style={styles.podiumTime}>{r.Time?.time ?? r.status}</Text>
            </View>
          ))}
        </View>

        {/* Résultats complets */}
        <View style={styles.resultsBox}>
          <Text style={styles.sectionTitle}>Classement complet</Text>
          {data.results.map((r: any) => (
            <View key={r.Driver.driverId} style={styles.row}>
              <Text style={[styles.pos, { color: PodiumColor(r.position) }]}>
                {r.position}
              </Text>
              <View style={styles.info}>
                <Text style={styles.name}>
                  {r.Driver.givenName} {r.Driver.familyName}
                </Text>
                <Text style={styles.team}>{r.Constructor.name}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.points}>{r.points} pts</Text>
                <Text style={styles.time}>{r.Time?.time ?? r.status}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: Colors.f1Black },
  center:      { flex: 1, backgroundColor: Colors.f1Black, alignItems: 'center', justifyContent: 'center' },
  scroll:      { padding: 16 },
  muted:       { color: Colors.f1Gray },
  header:      { marginBottom: 20 },
  label:       { color: Colors.f1Red, fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  raceName:    { color: Colors.f1White, fontSize: 24, fontWeight: '700' },
  podium:      { flexDirection: 'row', gap: 8, marginBottom: 24 },
  podiumCard:  { flex: 1, backgroundColor: '#1E1E2E', borderRadius: 10, padding: 12, alignItems: 'center' },
  podiumPos:   { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  podiumName:  { color: Colors.f1White, fontSize: 13, fontWeight: '600', textAlign: 'center' },
  podiumTeam:  { color: Colors.f1Gray, fontSize: 11, textAlign: 'center', marginTop: 2 },
  podiumTime:  { color: Colors.f1Gray, fontSize: 11, marginTop: 4 },
  resultsBox:  { backgroundColor: '#1E1E2E', borderRadius: 12, padding: 16 },
  sectionTitle:{ color: Colors.f1White, fontSize: 16, fontWeight: '600', marginBottom: 12 },
  row:         { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#2E2E3E' },
  pos:         { fontSize: 16, fontWeight: '700', width: 32 },
  info:        { flex: 1 },
  name:        { color: Colors.f1White, fontSize: 14, fontWeight: '600' },
  team:        { color: Colors.f1Gray, fontSize: 12, marginTop: 2 },
  right:       { alignItems: 'flex-end' },
  points:      { color: Colors.f1White, fontSize: 13, fontWeight: '700' },
  time:        { color: Colors.f1Gray, fontSize: 11, marginTop: 2 },
});