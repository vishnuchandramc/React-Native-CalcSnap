import AsyncStorage from '@react-native-async-storage/async-storage';

export const setDarkMode = async value => {
  console.log('---val', value);
  try {
    await AsyncStorage.setItem('darkmode', value?.toString());
  } catch (error) {
    // Handle AsyncStorage error
    console.log('AsyncStorage set error:', error);
  }
};

export const setHapticValueState = async value => {
  console.log(value.toString());
  try {
    await AsyncStorage.setItem('haptic', value?.toString());
  } catch (error) {
    // Handle AsyncStorage error
    console.log('AsyncStorage set error:', error);
  }
};
