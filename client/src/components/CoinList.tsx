import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

import {Coin} from '../entities/Coin';
import CoinListItem from './CoinListItem';

interface Props {
  data: Coin[];
  onSelectItem: (item: Coin) => void;
}

const CoinList = ({data, onSelectItem}: Props) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <CoinListItem item={item} onPress={() => onSelectItem(item)} />
      )}
    />
  );
};

export default CoinList;

const styles = StyleSheet.create({});
