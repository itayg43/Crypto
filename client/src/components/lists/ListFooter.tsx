import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
}

const ListFooter = ({containerStyle}: Props) => {
  return <View style={[styles.container, containerStyle]} />;
};

export default ListFooter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
});
