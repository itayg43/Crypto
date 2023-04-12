import React from 'react';
import {StyleSheet, FlatList, ViewStyle, View, Text} from 'react-native';

import {Coin} from '../entities/Coin';
import CoinListItem from './CoinListItem';
import {StyleProp} from 'react-native';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  data: Coin[];
  onSelectItem: (item: Coin) => void;
}

const CoinList = ({containerStyle, data, onSelectItem}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Header />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CoinListItem item={item} onSelect={() => onSelectItem(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Divider}
        ListFooterComponent={Footer}
      />
    </View>
  );
};

export default CoinList;

const Header = () => {
  return <Text style={styles.header}>Top Cryptocurrency</Text>;
};

const Divider = () => {
  return <View style={styles.divider} />;
};

const Footer = () => {
  return <View style={styles.footer} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    fontSize: 16,
    marginBottom: 15,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },

  footer: {
    marginBottom: 30,
  },
});
