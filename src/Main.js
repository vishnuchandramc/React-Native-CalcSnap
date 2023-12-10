import {Dimensions, StyleSheet, View} from 'react-native';
import {List, Text, useTheme} from 'react-native-paper';
import React from 'react';
import Header from './components/AppBar';
import DisplayScreen from './components/DisplayScreen';
import KeyPad from './components/Keypad';
import {useSelector} from 'react-redux';

const Main = ({navigation}) => {
  const {colors} = useTheme();
  const number = useSelector(state => state.calculator.number);
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header
        title={Platform.OS === 'ios' ? 'Calculator' : ''}
        style={{backgroundColor: colors.background, paddingHorizontal: 20}}
        navigation={navigation}
      />
      <DisplayScreen />
      <KeyPad />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
  },
});
