import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';  
import { Timezone } from '../../../types';
import { getLastTimezone, setLastTimezone } from '../../../services/storage';
import { fetchTimeZones } from '../../../services/apis';
import { loadTimeZones, saveTimeZones } from '../../../services/database';

export const useHome = () => {
  const [timezones, setTimezones] = useState<Timezone[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useState<Timezone | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const getData = async () => {
      try {
        let list = await loadTimeZones();

        if (!list.length) {
          list = await fetchTimeZones();          
          if (list.length) {
            await saveTimeZones(list);
          }
        }

        setTimezones(list);

        const lastSelected = getLastTimezone();        
        if (lastSelected && list.find(tz => tz.id === lastSelected.id)) {
          setSelectedTimezone(lastSelected);
        } else if (list.length) {
          setSelectedTimezone(list[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load');
        setTimezones([]);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (selectedTimezone) {
      setLastTimezone(selectedTimezone);
    }
  }, [selectedTimezone]);

  const clockSize = Math.min(width * 0.8, height * 0.4, 300);
  const isLandscape = width > height;

  return {
    timezones,
    selectedTimezone,
    loading,
    error,
    clockSize,
    isLandscape,
    onSelect: (timezone: Timezone) => setSelectedTimezone(timezone),
  };
};

