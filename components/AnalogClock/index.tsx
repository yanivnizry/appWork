import React from 'react';
import { Canvas, Circle, Line } from '@shopify/react-native-skia';
import { useAnalogClock } from './hooks/useAnalogClock';
import { COLORS } from '../../services/constants';

interface AnalogClockProps {
  timezoneOffset: number;
  size?: number;
}

const AnalogClock = ({ timezoneOffset, size }: AnalogClockProps) => {
  const { center, radius, clockSize, hands, markers } = useAnalogClock(timezoneOffset, size);

  return (
    <Canvas style={{ width: clockSize, height: clockSize }}>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        color={COLORS.LIGHT_GRAY}
        style="stroke"
        strokeWidth={2}
      />
      {markers.map((marker, index) => (
        <Line
          key={index}
          p1={{ x: marker.startX, y: marker.startY }}
          p2={{ x: marker.endX, y: marker.endY }}
          color={COLORS.DARK_GRAY}
          strokeWidth={2}
        />
      ))}

      <Line
        p1={{ x: center, y: center }}
        p2={{ x: hands.hourX, y: hands.hourY }}
        color={COLORS.DARK_GRAY}
        strokeWidth={4}
      />
      <Line
        p1={{ x: center, y: center }}
        p2={{ x: hands.minuteX, y: hands.minuteY }}
        color={COLORS.DARK_GRAY}
        strokeWidth={3}
      />
      <Line
        p1={{ x: center, y: center }}
        p2={{ x: hands.secondX, y: hands.secondY }}
        color={COLORS.RED}
        strokeWidth={2}
      />
      <Circle cx={center} cy={center} r={6} color={COLORS.DARK_GRAY} />
    </Canvas>
  );
};

export default AnalogClock;

