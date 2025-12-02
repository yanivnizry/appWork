export const config = {
  EXPO_PUBLIC_TIMEZONEDB_API_KEY: process.env.EXPO_PUBLIC_TIMEZONEDB_API_KEY || '',
  EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.timezonedb.com/v2.1',
  EXPO_PUBLIC_API_TIMEOUT: Number(process.env.EXPO_PUBLIC_API_TIMEOUT || '10000'),
};

