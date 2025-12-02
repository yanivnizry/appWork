import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { TimezoneSelectorItemProps } from './types';

const Item = ({ item, isSelected, onPress }: TimezoneSelectorItemProps) => {
  return <TouchableOpacity style={[styles.item, isSelected && styles.selectedItem]} onPress={() => onPress(item)}>
    <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>{item.name}</Text>
  </TouchableOpacity>
}

export default Item;

