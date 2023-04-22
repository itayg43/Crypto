import React, {ReactElement} from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {ContentStyle, FlashList} from '@shopify/flash-list';

interface WithId {
  id: string;
}

interface Props<T> {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: ContentStyle;
  items: T[];
  renderItem: (item: T) => ReactElement;
}

const GenericList = <T extends WithId>({
  containerStyle,
  contentContainerStyle,
  items,
  renderItem,
}: Props<T>) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <FlashList
        contentContainerStyle={{...styles.list, ...contentContainerStyle}}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => renderItem(item)}
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
