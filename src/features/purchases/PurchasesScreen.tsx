import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SectionList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp} from '../../application/App';
import HeaderListItem from '../products/components/HeaderListItem';
import {productsSeparator} from '../shared/components/ProductsSeparator';
import {PurchaseListItem} from './components/PurchaseListItem';
import {usePurchases} from './queries';

const PurchaseScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {data: purchases} = usePurchases();
  const purchasesList = purchases ?? [];

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={{flex: 1}}>
      <SectionList
        stickySectionHeadersEnabled={true}
        sections={purchasesList}
        renderItem={({item}) => <PurchaseListItem purchase={item} />}
        ItemSeparatorComponent={productsSeparator}
        keyExtractor={item => item.date}
        renderSectionHeader={({
          section: {title},
        }: {
          section: {title: string};
        }) => <HeaderListItem header={title} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default PurchaseScreen;
