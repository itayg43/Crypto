import React from 'react';
import {StyleSheet, Text} from 'react-native';

import SafeView from '../components/SafeView';

const HomeScreen = () => {
  return (
    <SafeView contentContainerStyle={styles.container}>
      <Text>Home</Text>
    </SafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
