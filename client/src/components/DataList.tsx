import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {ContentStyle, FlashList} from '@shopify/flash-list';

import {Coin} from '../entities/Coin';
import {Holding} from '../entities/Holding';
import DataListItem from './DataListItem';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  listStyle?: ContentStyle;
  data: Coin[] | Holding[];
  onSelectItem?: (id: string) => void;
}

const DataList = ({containerStyle, listStyle, data, onSelectItem}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <FlashList
        contentContainerStyle={listStyle}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <DataListItem
            item={item}
            onSelect={onSelectItem ? () => onSelectItem(item.id) : undefined}
          />
        )}
        estimatedItemSize={data.length}
        ItemSeparatorComponent={DataListDivider}
      />
    </View>
  );
};

export default DataList;

const DataListDivider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
    marginLeft: 25,
  },
});
