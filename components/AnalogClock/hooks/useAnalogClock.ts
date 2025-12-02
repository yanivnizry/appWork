import { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import { ClockTime, ClockHands, Marker } from '../types';

export const useAnalogClock = (timezoneOffset: number, size?: number) => {
  const screenWidth = Dimensions.get('window').width;
  const clockSize = size || Math.min(screenWidth * 0.8, 300);
  const center = clockSize / 2;
  const radius = clockSize / 2 - 20;

  const getCurrentTime = useCallback(() => {
    const d = new Date(Date.now() + timezoneOffset * 1000);
    return {
      hours: d.getUTCHours() % 12,
      minutes: d.getUTCMinutes(),
      seconds: d.getUTCSeconds(),
    };
  }, [timezoneOffset]);

  const [time, setTime] = useState<ClockTime>(getCurrentTime);

  useEffect(() => {
    const id = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(id);
  }, [getCurrentTime]);

  const degreesToRadians = useCallback((degrees: number) => (degrees - 90) * (Math.PI / 180), []);

  const hourAngle = degreesToRadians((time.hours + time.minutes / 60) * 30);
  const minuteAngle = degreesToRadians(time.minutes * 6);
  const secondAngle = degreesToRadians(time.seconds * 6);

  const hands: ClockHands = useMemo(() => ({
    hourX: center + Math.cos(hourAngle) * radius * 0.5,
    hourY: center + Math.sin(hourAngle) * radius * 0.5,
    minuteX: center + Math.cos(minuteAngle) * radius * 0.7,
    minuteY: center + Math.sin(minuteAngle) * radius * 0.7,
    secondX: center + Math.cos(secondAngle) * radius * 0.8,
    secondY: center + Math.sin(secondAngle) * radius * 0.8,
  }), [hourAngle, minuteAngle, secondAngle, center, radius]);

  const markers: Marker[] = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const angle = degreesToRadians(i * 30);
    const inner = radius - 10;
    return {
      startX: center + Math.cos(angle) * inner,
      startY: center + Math.sin(angle) * inner,
      endX: center + Math.cos(angle) * radius,
      endY: center + Math.sin(angle) * radius,
    };
  }), [radius, center]);

  return {
    time,
    center,
    radius,
    clockSize,
    hands,
    markers,
  };
};

