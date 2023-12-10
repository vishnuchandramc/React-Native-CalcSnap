import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../Main';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import Settings from '../Settings';
import {useTheme} from 'react-native-paper';
import {darkTheme, lightTheme} from '../../theme';
import {Provider as PaperProvider, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getDarkModeValue} from '../../async-storage/getData';
import {setThemeState} from '../../store/slice';
import AboutPage from '../AboutPage';

const Stack = createNativeStackNavigator();

function Routes() {
  const {isDarkModeEnabled} = useSelector(state => state.calculator);
  const [theme, setTheme] = React.useState(darkTheme);
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const getThemeData = async () => {
    try {
      const themeData = await getDarkModeValue('darkmode');
      console.log('---', themeData);
      if (themeData === undefined) {
        dispatch(setThemeState(colorScheme === 'dark'));
      } else {
        dispatch(setThemeState(themeData));
      }
    } catch (error) {
      console.log('Errr', error);
    }
  };
  React.useEffect(() => {
    const themeData = isDarkModeEnabled ? darkTheme : lightTheme;
    // console.log(colorScheme);
    getThemeData();
    setTheme(themeData);
  }, [isDarkModeEnabled]);
  const {colors} = useTheme();
  return (
    <PaperProvider theme={theme}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDarkModeEnabled ? 'light-content' : 'dark-content'}
        translucent={true}
      />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background, // Set the header background color here
          },
          headerTintColor: theme.colors.text, // Set the header text color here
          headerTitleStyle: {
            fontFamily: 'InterTight-SemiBold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}

          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="About"
          component={AboutPage}

          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}

export default Routes;
