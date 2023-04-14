import React from 'react';
import {StyleSheet, FlatList, ViewStyle, View, Text} from 'react-native';

import {Coin} from '../entities/Coin';
import CoinListItem from './CoinListItem';
import {StyleProp} from 'react-native';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  isShowHeader?: boolean;
  headerLabel?: string;
  data: Coin[];
  onSelectItem: (coin: Coin) => void;
}

const CoinList = ({
  containerStyle,
  isShowHeader = false,
  headerLabel = '',
  data,
  onSelectItem,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {isShowHeader && <Header label={headerLabel} />}

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

interface HeaderProps {
  label: string;
}

const Header = ({label}: HeaderProps) => {
  return <Text style={styles.header}>{label}</Text>;
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
    color: 'white',
    marginBottom: 15,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
  },

  footer: {
    marginBottom: 30,
  },
});
