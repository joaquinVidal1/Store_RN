import React from 'react';
import {SectionList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderListItem from '../products/components/HeaderListItem';
import {productsSeparator} from '../shared/components/ProductsSeparator';
import {PurchaseListItem} from './components/PurchaseListItem';
import {usePurchases} from './queries';

const PurchaseScreen = () => {
  const {data: purchases} = usePurchases();
  const purchasesList = purchases ?? [];

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.container}>
      <SectionList
        stickySectionHeadersEnabled={true}
        sections={purchasesList}
        renderItem={({item}) => <PurchaseListItem purchase={item} />}
        ItemSeparatorComponent={productsSeparator}
        keyExtractor={(item, index) => item.date + index}
        renderSectionHeader={({
          section: {title},
        }: {
          section: {title: string};
        }) => <HeaderListItem header={title} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PurchaseScreen;
