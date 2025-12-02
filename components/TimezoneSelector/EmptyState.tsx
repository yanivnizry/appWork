import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const EmptyState = () => {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.messageText}>{'No timezones available'}</Text>
    </View>
  );
};

export default EmptyState;

