import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../shared/colors';
import AddButton from './AddButton';
import {Product} from './ProductsList';

const ProductListItem = ({
  product,
  onAddProduct,
  onRemoveProduct,
}: {
  product: Product;
  onAddProduct: (product: Product) => void;
  onRemoveProduct: (product: Product) => void;
}) => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  const handlePress = () => {
    offset.value = withSequence(
      withTiming(-OFFSET, {duration: TIME / 2}),
      withRepeat(withTiming(OFFSET, {duration: TIME}), 5, true),
      withTiming(0, {duration: TIME / 2}),
    );
  };

  const OFFSET = 40;
  const TIME = 250;

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: product.listImageUrl}}
          style={styles.productImage}
          defaultSource={require('../../../../res/placeholder.jpg')}
        />
        <View style={styles.textsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        </View>
      </View>
      <AddButton
        quantity={product.quantity}
        onAddProduct={() => {
          handlePress();
          onAddProduct(product);
        }}
        onRemoveProduct={() => {
          handlePress();
          onRemoveProduct(product);
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    justifyContent: 'space-between',
    width: '100%',
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 50,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    color: colors.primaryColor,
  },
  productPrice: {
    fontSize: 16,
    color: colors.secondaryColor,
  },
  textsContainer: {
    flexDirection: 'column',
    marginStart: 24,
  },
});

export default ProductListItem;
