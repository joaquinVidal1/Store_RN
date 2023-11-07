import React from 'react';
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native';
import {colors} from '../../shared/colors';
import {useBanners} from '../queries';
import BannerItem from './BannerItem';

const Carrousel = () => {
  const {data: banners} = useBanners();
  const {width} = useWindowDimensions();

  return (
    <View>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        style={[{width: width}, styles.carrousel]}
        showsHorizontalScrollIndicator={false}>
        {banners?.map(item => (
          <BannerItem
            key={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
            description={item.description}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carrousel: {
    backgroundColor: colors.backgroundColor,
  },
});
export default Carrousel;
