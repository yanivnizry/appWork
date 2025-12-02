import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnalogClock from '../../components/AnalogClock';
import TimezoneSelector from '../../components/TimezoneSelector';
import { useHome } from '../home/hooks/useHome';
import styles from './styles';

const Home = () => {
  const {
    timezones,
    selectedTimezone,
    loading,
    error,
    clockSize,
    isLandscape,
    onSelect,
  } = useHome();

  const timezoneOffset = selectedTimezone?.gmtOffset ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, isLandscape && styles.contentLandscape]}>
        <View style={styles.clockContainer}>
          <AnalogClock
            timezoneOffset={timezoneOffset}
            size={clockSize}
          />
        </View>
        <View style={styles.selectorContainer}>
          <TimezoneSelector
            timezones={timezones}
            selectedTimezone={selectedTimezone}
            onSelect={onSelect}
            loading={loading}
            error={error}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
