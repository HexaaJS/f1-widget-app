import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLiveSession } from '../../src/hooks/useF1Query';
import { Colors } from '../../src/constants/colors';

export default function Live() {
  const { data, isLoading, isFetching, refetch } = useLiveSession();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            tintColor={Colors.f1Red}
          />
        }
      >
        {/* Status bar */}
        <View style={styles.statusBar}>
          <View style={[styles.dot, { backgroundColor: isFetching ? Colors.f1Red : '#2E2E3E' }]} />
          <Text style={styles.statusText}>
            {isFetching ? 'Mise à jour...' : 'Actualisation auto toutes les 30s'}
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.center}>
            <Text style={styles.muted}>Chargement...</Text>
          </View>
        ) : !data ? (
          <View style={styles.center}>
            <Text style={styles.noSession}>Aucune session en cours</Text>
            <Text style={styles.muted}>Les données apparaissent pendant les week-ends de course</Text>
          </View>
        ) : (
          <View>
            <View style={styles.header}>
              <Text style={styles.label}>Session en cours</Text>
              <Text style={styles.raceName}>{data.raceName}</Text>
            </View>

            {data.Results?.map((r: any) => (
              <View key={r.Driver.driverId} style={styles.row}>
                <Text style={styles.pos}>{r.position}</Text>
                <View style={styles.info}>
                  <Text style={styles.name}>
                    {r.Driver.givenName} {r.Driver.familyName}
                  </Text>
                  <Text style={styles.team}>{r.Constructor.name}</Text>
                </View>
                <Text style={styles.time}>{r.Time?.time ?? r.status}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: Colors.f1Black },
  scroll:     { padding: 16 },
  center:     { alignItems: 'center', marginTop: 80, gap: 8 },
  statusBar:  { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20, backgroundColor: '#1E1E2E', padding: 12, borderRadius: 8 },
  dot:        { width: 8, height: 8, borderRadius: 4 },
  statusText: { color: Colors.f1Gray, fontSize: 12 },
  header:     { marginBottom: 20 },
  label:      { color: Colors.f1Red, fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  raceName:   { color: Colors.f1White, fontSize: 24, fontWeight: '700' },
  noSession:  { color: Colors.f1White, fontSize: 18, fontWeight: '600' },
  muted:      { color: Colors.f1Gray, fontSize: 13, textAlign: 'center' },
  row:        { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E2E', borderRadius: 10, padding: 14, marginBottom: 8 },
  pos:        { color: Colors.f1White, fontSize: 18, fontWeight: '700', width: 36 },
  info:       { flex: 1 },
  name:       { color: Colors.f1White, fontSize: 15, fontWeight: '600' },
  team:       { color: Colors.f1Gray, fontSize: 12, marginTop: 2 },
  time:       { color: Colors.f1Gray, fontSize: 13 },
});