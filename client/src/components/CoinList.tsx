import React from 'react';
import {StyleSheet, FlatList, ViewStyle, View, Text} from 'react-native';

import {Coin} from '../entities/Coin';
import CoinListItem from './CoinListItem';
import {StyleProp} from 'react-native';

interface Props {
  contentContainerStyle?: StyleProp<ViewStyle>;
  data: Coin[];
  onSelectItem: (item: Coin) => void;
}

const CoinList = ({contentContainerStyle, data, onSelectItem}: Props) => {
  return (
    <FlatList
      contentContainerStyle={contentContainerStyle}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <CoinListItem item={item} onPress={() => onSelectItem(item)} />
      )}
      ListHeaderComponent={Header}
      ItemSeparatorComponent={Divider}
      ListFooterComponent={Footer}
    />
  );
};

export default CoinList;

const Header = () => {
  return (
    <View style={styles.header}>
      <Text>Top Cryptocurrency</Text>
    </View>
  );
};

const Divider = () => {
  return <View style={styles.divider} />;
};

const Footer = () => {
  return <View style={styles.footer} />;
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },

  footer: {
    marginBottom: 30,
  },
});
