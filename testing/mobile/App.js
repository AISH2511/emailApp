import React from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import { AuthScreen } from './screens';
export default function App() {
  return (
    <View style={styles.container}>
      <AuthScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
