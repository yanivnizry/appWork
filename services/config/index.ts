export const config = {
  TIMEZONEDB_API_KEY: process.env.TIMEZONEDB_API_KEY || '',
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.timezonedb.com/v2.1',
  API_TIMEOUT: Number(process.env.API_TIMEOUT || '10000'),
};

