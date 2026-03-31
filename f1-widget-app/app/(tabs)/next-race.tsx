import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNextRace } from '../../src/hooks/useF1Query';
import { Colors } from '../../src/constants/colors';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'react';

dayjs.extend(duration);

function Countdown({ raceDate }: { raceDate: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const update = () => {
      const diff = dayjs(raceDate).diff(dayjs());
      if (diff <= 0) { setTimeLeft('En cours !'); return; }
      const d = dayjs.duration(diff);
      setTimeLeft(
        `${d.days()}j ${d.hours()}h ${d.minutes()}m ${d.seconds()}s`
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [raceDate]);

  return <Text style={styles.countdown}>{timeLeft}</Text>;
}

export default function NextRace() {
  const { data, isLoading, error } = useNextRace();

  if (isLoading) return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.label}>Chargement...</Text>
    </SafeAreaView>
  );

  if (error || !data) return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.label}>Données indisponibles</Text>
    </SafeAreaView>
  );

  const sessions = [
    { label: 'Essais Libres 1', date: data.FirstPractice?.date },
    { label: 'Essais Libres 2', date: data.SecondPractice?.date },
    { label: 'Essais Libres 3', date: data.ThirdPractice?.date },
    { label: 'Qualifications',  date: data.Qualifying?.date },
    { label: 'Sprint',          date: data.Sprint?.date },
    { label: 'Course',          date: data.date },
  ].filter(s => s.date);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.round}>Round {data.round} · {data.season}</Text>
          <Text style={styles.raceName}>{data.raceName}</Text>
          <Text style={styles.circuit}>{data.Circuit?.circuitName}</Text>
          <Text style={styles.location}>
            {data.Circuit?.Location?.locality}, {data.Circuit?.Location?.country}
          </Text>
        </View>

        {/* Countdown */}
        <View style={styles.countdownBox}>
          <Text style={styles.label}>Course dans</Text>
          <Countdown raceDate={data.date} />
        </View>

        {/* Sessions */}
        <View style={styles.sessionsBox}>
          <Text style={styles.sectionTitle}>Programme</Text>
          {sessions.map((s) => (
            <View key={s.label} style={styles.sessionRow}>
              <Text style={styles.sessionLabel}>{s.label}</Text>
              <Text style={styles.sessionDate}>
                {dayjs(s.date).format('ddd DD MMM')}
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: Colors.f1Black },
  scroll:       { padding: 20 },
  center:       { flex: 1, backgroundColor: Colors.f1Black, alignItems: 'center', justifyContent: 'center' },
  header:       { marginBottom: 24 },
  round:        { color: Colors.f1Red, fontSize: 13, fontWeight: '600', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 },
  raceName:     { color: Colors.f1White, fontSize: 28, fontWeight: '700', marginBottom: 4 },
  circuit:      { color: Colors.f1Gray, fontSize: 15, marginBottom: 2 },
  location:     { color: Colors.f1Gray, fontSize: 13 },
  countdownBox: { backgroundColor: '#1E1E2E', borderRadius: 12, padding: 20, alignItems: 'center', marginBottom: 24 },
  label:        { color: Colors.f1Gray, fontSize: 13, marginBottom: 8 },
  countdown:    { color: Colors.f1White, fontSize: 32, fontWeight: '700', letterSpacing: 2 },
  sessionsBox:  { backgroundColor: '#1E1E2E', borderRadius: 12, padding: 20 },
  sectionTitle: { color: Colors.f1White, fontSize: 16, fontWeight: '600', marginBottom: 16 },
  sessionRow:   { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#2E2E3E' },
  sessionLabel: { color: Colors.f1White, fontSize: 14 },
  sessionDate:  { color: Colors.f1Gray, fontSize: 14 },
});