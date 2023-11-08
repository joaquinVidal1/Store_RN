import React, {useState} from 'react';
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native';
import {colors} from '../../shared/colors';
import {useBanners} from '../queries';
import BannerItem from './BannerItem';

const Carrousel = () => {
  const {data: banners} = useBanners();
  const {width} = useWindowDimensions();

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: {nativeEvent: {contentOffset: {x: any}}}) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setActiveIndex(currentIndex);
  };

  return (
    <View style={styles.carrousel}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        style={[{width: width}, styles.carrousel]}
        onScroll={handleScroll}
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
      <View style={styles.dotsContainer}>
        {banners?.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.paginationDot,
              {backgroundColor: index === activeIndex ? '#50546D' : '#DBD6D9'},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carrousel: {
    backgroundColor: colors.backgroundColor,
  },
  paginationDot: {
    height: 6,
    width: 6,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 16,
  },
});
export default Carrousel;
