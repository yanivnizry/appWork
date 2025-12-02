export const config = {
  TIMEZONEDB_API_KEY: process.env.EXPO_PUBLIC_TIMEZONEDB_API_KEY || '',
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.timezonedb.com/v2.1',
  API_TIMEOUT: Number(process.env.EXPO_PUBLIC_API_TIMEOUT || '10000'),
};

