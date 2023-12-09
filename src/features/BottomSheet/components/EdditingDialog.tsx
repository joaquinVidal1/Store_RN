import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import ProductListItem from '../../products/components/ProductListItem';
import {Product} from '../../products/types/Product';
import {colors} from '../../shared/colors';

const EdditingDialog = ({
  product,
  onConfirmEdittion,
  onDismiss,
}: {
  product: Product;
  onConfirmEdittion: (newQuantity: number) => void;
  onDismiss: () => void;
}) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const showModal: boolean = useMemo(() => product !== undefined, [product]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(quantity - 1);
  };

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onDismiss}
      onDismiss={onDismiss}
      isVisible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Edit item count</Text>
          <ProductListItem
            product={{...product, quantity: quantity}}
            onAddProduct={incrementQuantity}
            onRemoveProduct={decrementQuantity}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => {
                onDismiss();
              }}>
              <Text style={[styles.modalTextButton, {marginEnd: 24}]}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onConfirmEdittion(quantity);
              }}>
              <Text style={styles.modalTextButton}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
    width: '90%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  title: {
    color: colors.primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginEnd: 16,
  },
  modalTextButton: {
    color: colors.purple,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EdditingDialog;
