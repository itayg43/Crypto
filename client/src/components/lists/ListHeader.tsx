import React from 'react';
import {StyleSheet, View, Text, StyleProp, ViewStyle} from 'react-native';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  label: string;
}

const ListHeader = ({containerStyle, labelStyle, label}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  label: {
    fontSize: 16,
  },
});
