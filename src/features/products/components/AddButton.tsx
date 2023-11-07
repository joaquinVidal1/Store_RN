import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Add from '../../../../res/add.svg';
import Remove from '../../../../res/remove.svg';
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
        <TouchableOpacity style={styles.entireAddButton} onPress={onAddProduct}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.greyAddButton}>
        <TouchableOpacity
          style={styles.greyAddButtonIcon}
          onPress={onRemoveProduct}>
          <Remove />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.greyAddButtonIcon}
          onPress={onAddProduct}>
          <Add />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  entireAddButton: {
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
  greyAddButton: {
    borderColor: '#F3F3F3',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderWidth: 2,
    alignItems: 'center',
    borderRadius: 50,
  },
  greyAddButtonIcon: {
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});

export default AddButton;
