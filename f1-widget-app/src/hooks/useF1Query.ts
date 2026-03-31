import { useQuery } from '@tanstack/react-query';
import {
  fetchNextRace,
  fetchLastRace,
  fetchDriverStandings,
  fetchConstructorStandings,
  fetchLiveSession,
} from '../services/f1Api';

export const useNextRace = () =>
  useQuery({ queryKey: ['nextRace'], queryFn: fetchNextRace });

export const useLastRace = () =>
  useQuery({ queryKey: ['lastRace'], queryFn: fetchLastRace });

export const useDriverStandings = () =>
  useQuery({ queryKey: ['driverStandings'], queryFn: fetchDriverStandings });

export const useConstructorStandings = () =>
  useQuery({ queryKey: ['constructorStandings'], queryFn: fetchConstructorStandings });

export const useLiveSession = () =>
  useQuery({
    queryKey: ['liveSession'],
    queryFn: fetchLiveSession,
    refetchInterval: 30_000, // polling toutes les 30s
  });