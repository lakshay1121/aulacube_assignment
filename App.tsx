import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HomeScreen from './Screen/HomeScreen';


type Props = {};

const App = (props: Props) => {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
