import { axiosClient } from './axiosClient';
import { config } from '../config';

export const fetchTimeZones = async () => {
  if (!config.TIMEZONEDB_API_KEY) {
    throw new Error('Missing API key');
  }

  const response = await axiosClient.get('/list-time-zone', {
    params: {
      key: config.TIMEZONEDB_API_KEY,
      format: 'json',
    },
  });

  if (response.data.status !== 'OK') {
    throw new Error(response.data.message || 'Timezone API error');
  }

  if (!response.data.zones?.length) {
    throw new Error('Empty timezone list');
  }

  return response.data;
};

