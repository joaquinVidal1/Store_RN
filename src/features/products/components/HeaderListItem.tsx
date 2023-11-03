import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors} from '../../shared/colors';

const HeaderListItem = ({header}: {header: string}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        {header.charAt(0).toUpperCase() + header.slice(1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    marginStart: 18,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.primaryColor,
  },
});

export default HeaderListItem;
