import React from 'react';
import {StyleSheet, FlatList, ViewStyle} from 'react-native';

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
    />
  );
};

export default CoinList;

const styles = StyleSheet.create({});
