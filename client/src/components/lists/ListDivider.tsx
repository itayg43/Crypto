import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
}

const ListDivider = ({containerStyle}: Props) => {
  return <View style={[styles.container, containerStyle]} />;
};

export default ListDivider;

const styles = StyleSheet.create({
  container: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
    marginLeft: 25,
  },
});
