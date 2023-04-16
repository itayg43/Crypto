import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle, Text} from 'react-native';
import {ContentStyle, FlashList} from '@shopify/flash-list';

import {Holding} from '../entities/Holding';
import {ListHeader, ListDivider, ListFooter} from './lists';
import HoldingListItem from './HoldingListItem';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  listStyle?: ContentStyle;
  isShowHeader?: boolean;
  headerLabel?: string;
  data: Holding[];
  onSelectItem: (holding: Holding) => void;
}

const HoldingList = ({
  containerStyle,
  listStyle,
  isShowHeader = false,
  headerLabel = '',
  data,
  onSelectItem,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {isShowHeader && <ListHeader label={headerLabel} />}

      <HoldingListColumnTitles />

      <FlashList
        contentContainerStyle={listStyle}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <HoldingListItem item={item} onSelect={() => onSelectItem(item)} />
        )}
        estimatedItemSize={data.length}
        ItemSeparatorComponent={ListDivider}
        ListFooterComponent={ListFooter}
      />
    </View>
  );
};

export default HoldingList;

function HoldingListColumnTitles() {
  return (
    <View style={styles.columnTitlesContainer}>
      {/** spacer */}
      <View style={styles.columnTitleSpacer} />

      {/** price */}
      <View style={styles.columnTitleContainer}>
        <Text>Price</Text>
      </View>

      {/** value */}
      <View style={styles.columnTitleContainer}>
        <Text>Value</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  columnTitlesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  columnTitleSpacer: {
    flex: 1,
  },
  columnTitleContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
