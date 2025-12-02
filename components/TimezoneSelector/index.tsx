import React from 'react';
import { View, FlatList } from 'react-native';
import { Timezone } from '../../types';
import styles from './styles';  
import { TimezoneSelectorProps } from './types';
import Item from './Item';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';

const TimezoneSelector = ({
  timezones,
  selectedTimezone,
  onSelect,
  loading,
  error,
}: TimezoneSelectorProps) => {
  const renderItem = ({ item }: { item: Timezone }) => (
    <Item
      item={item}
      isSelected={selectedTimezone?.id === item.id}
      onPress={onSelect}
    />
  );

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={timezones}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState />}
      />
    </View>
  );
};

export default TimezoneSelector;

