import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {StyleProps} from 'react-native-reanimated';
import {colors} from '../../shared/colors';

const ConfirmationButton = ({
  onPress,
  text,
  style,
}: {
  onPress: () => void;
  text: string;
  style: StyleProps;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.fab, style]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default ConfirmationButton;
