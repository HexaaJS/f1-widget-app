import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useDriverStandings, useConstructorStandings } from '../../src/hooks/useF1Query';
import { Colors } from '../../src/constants/colors';

function PodiumColor(position: string) {
  switch (position) {
    case '1': return Colors.podium.gold;
    case '2': return Colors.podium.silver;
    case '3': return Colors.podium.bronze;
    default:  return Colors.f1White;
  }
}

export default function Standings() {
  const [tab, setTab] = useState<'drivers' | 'constructors'>('drivers');
  const { data: drivers,      isLoading: loadD } = useDriverStandings();
  const { data: constructors, isLoading: loadC } = useConstructorStandings();

  const isLoading = tab === 'drivers' ? loadD : loadC;

  return (
    <SafeAreaView style={styles.container}>

      {/* Toggle */}
      <View style={styles.toggle}>
        <TouchableOpacity
          style={[styles.toggleBtn, tab === 'drivers' && styles.toggleActive]}
          onPress={() => setTab('drivers')}
        >
          <Text style={[styles.toggleText, tab === 'drivers' && styles.toggleTextActive]}>
            Pilotes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, tab === 'constructors' && styles.toggleActive]}
          onPress={() => setTab('constructors')}
        >
          <Text style={[styles.toggleText, tab === 'constructors' && styles.toggleTextActive]}>
            Constructeurs
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <Text style={styles.muted}>Chargement...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          {tab === 'drivers'
            ? drivers?.map((item: any) => (
                <View key={item.Driver.driverId} style={styles.row}>
                  <Text style={[styles.pos, { color: PodiumColor(item.position) }]}>
                    {item.position}
                  </Text>
                  <View style={styles.info}>
                    <Text style={styles.name}>
                      {item.Driver.givenName} {item.Driver.familyName}
                    </Text>
                    <Text style={styles.team}>{item.Constructors[0]?.name}</Text>
                  </View>
                  <Text style={styles.points}>{item.points} pts</Text>
                </View>
              ))
            : constructors?.map((item: any) => (
                <View key={item.Constructor.constructorId} style={styles.row}>
                  <Text style={[styles.pos, { color: PodiumColor(item.position) }]}>
                    {item.position}
                  </Text>
                  <View style={styles.info}>
                    <Text style={styles.name}>{item.Constructor.name}</Text>
                    <Text style={styles.team}>{item.Constructor.nationality}</Text>
                  </View>
                  <Text style={styles.points}>{item.points} pts</Text>
                </View>
              ))
          }
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: Colors.f1Black },
  center:          { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll:          { padding: 16 },
  muted:           { color: Colors.f1Gray },
  toggle:          { flexDirection: 'row', margin: 16, backgroundColor: '#1E1E2E', borderRadius: 10, padding: 4 },
  toggleBtn:       { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  toggleActive:    { backgroundColor: Colors.f1Red },
  toggleText:      { color: Colors.f1Gray, fontWeight: '600', fontSize: 14 },
  toggleTextActive:{ color: Colors.f1White },
  row:             { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E2E', borderRadius: 10, padding: 14, marginBottom: 8 },
  pos:             { fontSize: 18, fontWeight: '700', width: 36 },
  info:            { flex: 1 },
  name:            { color: Colors.f1White, fontSize: 15, fontWeight: '600' },
  team:            { color: Colors.f1Gray, fontSize: 12, marginTop: 2 },
  points:          { color: Colors.f1White, fontSize: 15, fontWeight: '700' },
});