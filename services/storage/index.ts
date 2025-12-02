import { createMMKV } from 'react-native-mmkv';
import { Timezone } from '../../types';

const storage = createMMKV();
const LAST_TIMEZONE_KEY = 'lastTimezone';

export const getLastTimezone = () => {
  const data = storage.getString('lastTimezone');
  if (!data) return null;
  try {
    return JSON.parse(data) as Timezone;
  } catch {
    return null;
  }
};

export const setLastTimezone = (timezone: Timezone) => {
  storage.set(LAST_TIMEZONE_KEY, JSON.stringify(timezone));
};

