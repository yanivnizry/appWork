import React, { FC } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';


const ErrorState = ({ error }: { error: string }) => {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

export default ErrorState;

