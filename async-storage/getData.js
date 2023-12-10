import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDarkModeValue = async () => {
  try {
    const value = await AsyncStorage.getItem('darkmode');
    if (value === 'true') return true;
    else if (value === undefined) return value;
    else return false;
  } catch (error) {
    console.log('AsyncStorage get error:', error);
    return false;
  }
};

export const getHapticValue = async () => {
  try {
    const value = await AsyncStorage.getItem('haptic');
    if (value === 'true') return true;
    else return false;
  } catch (e) {
    // error reading value
    console.log(e);
    return false;
  }
};
