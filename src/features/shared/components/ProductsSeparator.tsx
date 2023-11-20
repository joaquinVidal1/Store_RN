import React from 'react';
import {View} from 'react-native';
import {colors} from '../colors';

export const productsSeparator = () => {
  return (
    <View style={{height: 1, width: '90%', backgroundColor: colors.gray}} />
  );
};
