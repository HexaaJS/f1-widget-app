const BASE_URL = 'https://api.jolpi.ca/ergast/f1';

export async function fetchNextRace() {
  const res = await fetch(`${BASE_URL}/current/next.json`);
  const data = await res.json();
  return data.MRData.RaceTable.Races[0];
}

export async function fetchLastRace() {
  const res = await fetch(`${BASE_URL}/current/last/results.json`);
  const data = await res.json();
  const race = data.MRData.RaceTable.Races[0];
  return {
    raceName: race.raceName,
    results: race.Results.slice(0, 10),
  };
}

export async function fetchDriverStandings() {
  const res = await fetch(`${BASE_URL}/current/driverStandings.json`);
  const data = await res.json();
  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}

export async function fetchConstructorStandings() {
  const res = await fetch(`${BASE_URL}/current/constructorStandings.json`);
  const data = await res.json();
  return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
}

export async function fetchLiveSession() {
  const season = new Date().getFullYear();
  const res = await fetch(`${BASE_URL}/${season}/current/results.json`);
  const data = await res.json();
  return data.MRData.RaceTable.Races[0] ?? null;
}