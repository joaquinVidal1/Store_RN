import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../colors';

export const productsSeparator = () => {
  return <View style={styles.lineStyle} />;
};

const styles = StyleSheet.create({
  lineStyle: {height: 1, width: '90%', backgroundColor: colors.gray},
});
