import React from 'react';
import {ColorValue, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../shared/colors';

const ConfirmationButton = ({
  onPress,
  text,
  color,
}: {
  onPress: () => void;
  text: string;
  color: ColorValue;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.fab, {backgroundColor: color}]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 50,
    elevation: 4,
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default ConfirmationButton;
