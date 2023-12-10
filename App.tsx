import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';

import store from './store/store';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/Route';

const App = () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
