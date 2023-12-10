import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, FlatList, Dimensions, View} from 'react-native';
import {Surface, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getHapticValue} from '../../async-storage/getData';
import {
  calculate,
  calculatePercentage,
  clear,
  clearResult,
  invertNumber,
  setDecimal,
  setFirstOperand,
  setHapticState,
  setNumber,
  setOperator,
} from '../../store/slice';
import CalcButton from './CalcButton';
import DisplayScreen from './DisplayScreen';

const KeyPad = ({style}) => {
  const [buttonWidth, setButtonWidth] = useState(0);
  const {result, isHapticEnabled} = useSelector(state => state.calculator);
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const numColumns = 4; // Change the number of columns as needed

  const getHapticState = async () => {
    try {
      const hapticData = await getHapticValue('haptic');
      console.log('---', hapticData);

      dispatch(setHapticState(hapticData));
    } catch (error) {
      console.log('Errr', error);
    }
  };
  useEffect(() => {
    getHapticState();
  }, [isHapticEnabled]);

  const NUMBER_DATA = [
    {
      id: 'clear',
      value: 'AC',
    },
    {
      id: 'plus-minus',
      value: '+/-',
    },
    {
      id: 'percent',
      value: '%',
    },
    {
      id: 'divide',
      value: '÷',
    },
    {
      id: '7',
      value: '7',
    },
    {
      id: '8',
      value: '8',
    },
    {
      id: '9',
      value: '9',
    },
    {
      id: 'multiply',
      value: '×',
    },
    {
      id: '4',
      value: '4',
    },
    {
      id: '5',
      value: '5',
    },
    {
      id: '6',
      value: '6',
    },
    {
      id: 'subtract',
      value: '-',
    },
    {
      id: '1',
      value: '1',
    },
    {
      id: '2',
      value: '2',
    },
    {
      id: '3',
      value: '3',
    },
    {
      id: 'add',
      value: '+',
    },
    {
      id: 'zero',
      value: '0',
    },
    {
      id: 'decimal',
      value: '.',
    },
    {
      id: 'equals',
      value: '=',
    },
  ];

  useLayoutEffect(() => {
    // Calculate the button width based on the container's width
    const containerWidth = Dimensions.get('window').width - 20;
    const spacing = 14; // Adjust the spacing between buttons as needed
    const calculatedButtonWidth =
      (containerWidth - spacing * (numColumns + 1)) / numColumns;
    setButtonWidth(calculatedButtonWidth);
  }, []);

  const handleButtonPress = item => {
    if (item.id === 'clear') {
      dispatch(clear());
    } else if (item.id === 'equals') {
      dispatch(calculate());
    } else if (item.id === 'plus-minus') {
      dispatch(invertNumber());
    } else if (item.id === 'decimal') {
      dispatch(setDecimal());
    } else if (item.id === 'percent') {
      dispatch(calculatePercentage());
    } else if (['+', '-', '×', '÷'].includes(item.value)) {
      if (result !== '') {
        dispatch(setFirstOperand(result));
        dispatch(clearResult());
      }
      dispatch(setOperator(item.value));
    } else {
      dispatch(setNumber(item.value));
    }
  };

  const renderNumber = ({item}) => {
    return (
      <CalcButton
        onPress={() => handleButtonPress(item)}
        label={item.value}
        buttonWidth={
          item.id == 'zero'
            ? buttonWidth * 2 + Dimensions.get('window').height * 0.01 * 2
            : buttonWidth
        }
        buttonHeight={buttonWidth}
      />
    );
  };

  const getItemLayout = (_, index) => {
    return {length: buttonWidth, offset: buttonWidth * index, index};
  };

  return (
    <View
      style={[styles.calculator, style, {backgroundColor: colors.background}]}>
      <FlatList
        data={NUMBER_DATA}
        renderItem={renderNumber}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        getItemLayout={getItemLayout}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calculator: {
    justifyContent: 'flex-end', // Align the keypad section at the bottom
    alignItems: 'center',
  },
  flatListContainer: {
    paddingTop: 8,
    paddingBottom: 16, // Add padding to create space between the display and keypad
  },
});

export default KeyPad;
