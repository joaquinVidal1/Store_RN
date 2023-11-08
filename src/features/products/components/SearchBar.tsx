import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const SearchBar = ({
  query,
  onQueryChanged,
  style,
}: {
  query: string;
  onQueryChanged: (newQuery: string) => void;
  style: StyleMedia;
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={onQueryChanged}
        value={query}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    margin: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#f0f0f0',
    color: '#424242',
    borderRadius: 20,
  },
});
