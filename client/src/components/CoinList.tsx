import React from 'react';
import {
  StyleSheet,
  FlatList,
  ViewStyle,
  View,
  StyleProp,
  Text,
} from 'react-native';

import {Coin} from '../entities/Coin';
import CoinListItem from './CoinListItem';

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

function Header({label}: HeaderProps) {
  return <Text style={styles.header}>{label}</Text>;
}

function Divider() {
  return <View style={styles.divider} />;
}

function Footer() {
  return <View style={styles.footer} />;
}

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
    marginLeft: 40,
  },

  footer: {
    marginBottom: 30,
  },
});
