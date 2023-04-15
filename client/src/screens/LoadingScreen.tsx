import React from 'react';
import {StyleSheet, ActivityIndicator, Text} from 'react-native';

import SafeView from '../components/SafeView';

const LoadingScreen = () => {
  return (
    <SafeView contentContainerStyle={styles.container}>
      <ActivityIndicator />

      <Text style={styles.text}>Loading...</Text>
    </SafeView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginTop: 10,
  },
});
