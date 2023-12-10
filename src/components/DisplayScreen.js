import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, PanResponder, StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {removeRightDigit} from '../../store/slice';

const DisplayScreen = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const {firstOperand, secondOperand, operator, result} = useSelector(
    state => state.calculator,
  );

  const [displayText, setDisplayText] = useState('0');

  function formatNumberWithCommas(number) {
    const parts = String(number).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // If there is a decimal part, append it to the formatted integer part
    const formattedNumber = parts.length > 1 ? parts.join('.') : parts[0];

    return formattedNumber;
  }

  // PanResponder for handling swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        const swipeThreshold = 50;

        if (gestureState.dx > swipeThreshold) {
          // Right swipe

          console.log('Hahah');
          dispatch(removeRightDigit());
        } else if (gestureState.dx < -swipeThreshold) {
          // Left swipe
          console.log('Left');
          dispatch(removeRightDigit());
        }
      },
    }),
  ).current;

  useEffect(() => {
    let text =
      result !== ''
        ? result
        : secondOperand !== ''
        ? secondOperand
        : firstOperand !== ''
        ? firstOperand
        : '0';

    // text = text.length > 20 ? text.slice(0, 20) : text;
    text = ['Infinity', '-Infinity', 'NaN'].includes(String(text))
      ? 'Math Error'
      : formatNumberWithCommas(text);

    // Check if the number of digits is greater than 10
    const numberOfDigits = String(text).replace('.', '').length;

    if (numberOfDigits > 12) {
      console.log('TEXT====', text);
      // Manually format the number in exponential notation

      if (!String(text).includes('e')) {
        text = text;
      } else {
        const [coefficient, exponent] = parseFloat(text)
          .toExponential(8)
          .split('e');
        const formattedExponent =
          parseInt(exponent, 10) === 0 ? '' : `e${parseInt(exponent, 10)}`;

        text = `${coefficient}${formattedExponent}`;
      }
    }

    setDisplayText(text);
  }, [firstOperand, secondOperand, operator, result]);

  const calculateFontSize = () => {
    const screenWidth = Dimensions.get('window').width;
    const operandLength = displayText.toString().length;

    let fontSize = 0.21 * screenWidth; // Default font size for 4-digit numbers

    if (operandLength >= 5 && operandLength <= 7) {
      fontSize = 0.2 * screenWidth; // Font size for 5 to 7-digit numbers
    } else if (operandLength > 7 && operandLength <= 12) {
      fontSize = 0.15 * screenWidth; // Font size for 8 to 10-digit numbers
    } else if (operandLength > 12 && operandLength <= 14) {
      fontSize = 0.1 * screenWidth; // Font size for 11 to 12-digit numbers
    } else if (operandLength > 14) {
      fontSize = 0.08 * screenWidth; // Font size for more than 12-digit numbers
    }

    return fontSize;
  };

  const fontSize = calculateFontSize();

  return (
    <View style={styles.display} {...panResponder.panHandlers}>
      <Text
        style={[styles.text, {color: colors.text, fontSize}]}
        numberOfLines={2}
        selectable
        ellipsizeMode="head">
        {displayText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: 'InterTight-Light',
    textAlign: 'right',
  },
});

export default DisplayScreen;
