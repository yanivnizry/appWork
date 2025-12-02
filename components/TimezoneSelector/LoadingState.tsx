import React, { FC } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../../services/constants';
import styles from './styles';

const LoadingState = () => {
  return (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={COLORS.BLUE} />
    </View>
  );
};

export default LoadingState;

