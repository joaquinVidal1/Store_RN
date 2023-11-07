import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {colors} from '../../shared/colors';

const MARGIN_HORIZONTAL = 18;

const BannerItem = ({
  imageUrl,
  name,
  description,
}: {
  imageUrl: string;
  name: string;
  description: string;
}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        source={{uri: imageUrl}}
        style={[styles.image, {width: width - MARGIN_HORIZONTAL * 2}]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    marginHorizontal: MARGIN_HORIZONTAL,
    borderRadius: 4,
    aspectRatio: 339 / 162,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.white,
  },
  textContainer: {
    position: 'absolute',
    alignSelf: 'flex-start',
    bottom: 27,
    start: MARGIN_HORIZONTAL * 2,
  },
});

export default BannerItem;
