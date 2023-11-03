import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../shared/colors';

const AddButton = ({
  quantity,
  onAddProduct,
  onRemoveProduct,
}: {
  quantity: number;
  onAddProduct: () => void;
  onRemoveProduct: () => void;
}) => {
  if (quantity === 0) {
    return (
      <View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText} onPress={onAddProduct}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View>
        <Text>{quantity}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
});

export default AddButton;
