/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ProductsList} from '../features/products';
import {QueryProvider} from '../infrastructure/query';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <QueryProvider>
      <SafeAreaView style={backgroundStyle}>
        <ProductsList />
      </SafeAreaView>
    </QueryProvider>
  );
}

export default App;
