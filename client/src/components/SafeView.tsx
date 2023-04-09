import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface Props {
  children: React.ReactNode;
  safeContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const SafeView = ({
  children,
  safeContainerStyle,
  contentContainerStyle,
}: Props) => {
  return (
    <SafeAreaView style={[styles.safeContainer, safeContainerStyle]}>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default SafeView;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});
