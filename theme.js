import {DefaultTheme} from 'react-native-paper';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Define your light mode colors here
    background: '#e9e9e9',
    text: '#000000',
    buttonColor: '#ccc',
    activeButtonColor: '#313131',
    activeButtonColor2: '#a0a0a0',
    rippleColor: '#060606',
    colorBlack: '#000',
  },
};

const darkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    // Define your dark mode colors here
    background: '#000000',
    text: '#FFFFFF',
    buttonColor: '#313131',
    activeButtonColor: '#fcfcfc',
    activeButtonColor2: '#a0a0a0',
    rippleColor: '#f5fefd',
    colorBlack: '#000',
  },
};

export {lightTheme, darkTheme};
