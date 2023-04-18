import React, {ReactElement} from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {ContentStyle, FlashList} from '@shopify/flash-list';

interface Props<T> {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: ContentStyle;
  items: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T, index: number) => ReactElement;
}

const GenericList = <T extends unknown>({
  containerStyle,
  contentContainerStyle,
  items,
  keyExtractor,
  renderItem,
}: Props<T>) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <FlashList
        contentContainerStyle={{...styles.list, ...contentContainerStyle}}
        data={items}
        keyExtractor={keyExtractor}
        renderItem={({item, index}) => renderItem(item, index)}
        estimatedItemSize={items.length > 0 ? items.length : 1}
        ItemSeparatorComponent={Divider}
        ListFooterComponent={Footer}
      />
    </View>
  );
};

export default GenericList;

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

  list: {
    paddingHorizontal: 10,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
  },

  footer: {
    marginBottom: 20,
  },
});
