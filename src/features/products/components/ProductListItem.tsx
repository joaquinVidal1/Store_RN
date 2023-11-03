import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Product} from '../../../infrastructure/api';
import {colors} from '../../shared/colors';

const ProductListItem = ({product}: {product: Product}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: product.listImageUrl}}
          style={styles.productImage}
        />
        <View style={styles.textsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 18,
    paddingVertical: 16,
    justifyContent: 'space-between',
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
  addButton: {
    paddingVertical: 6,
    paddingHorizontal: 32,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.purple,
  },
  addButtonText: {
    color: colors.purple,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textsContainer: {
    flexDirection: 'column',
    marginStart: 24,
  },
});

export default ProductListItem;
