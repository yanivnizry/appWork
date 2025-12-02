import { axiosClient } from './axiosClient';
import { config } from '../config';

export const fetchTimeZones = async () => {
  
  if (!config.TIMEZONEDB_API_KEY) {
    throw new Error('Missing API key');
  }

  try {
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

    return response.data.zones.map((zone: any) => ({
      id: zone.zoneName,
      name: `${zone.countryName}/${zone.zoneName.split('/').pop()}`,
      gmtOffset: zone.gmtOffset,
    }));
  } catch (error) {
    console.error('[API] Fetch error:', error);
    throw error;
  }
};

