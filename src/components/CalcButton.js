import React, {memo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';
import HapticFeedback from 'react-native-haptic-feedback';
import CustomIcon from '../assets/fonts/CustomIcon';
import {useSelector} from 'react-redux';

const CalcButton = ({onPress, label, buttonWidth, buttonHeight}) => {
  const {result, isHapticEnabled, firstOperand} = useSelector(
    state => state.calculator,
  );
  const {colors} = useTheme();

  const handlePress = () => {
    if (isHapticEnabled) HapticFeedback.trigger('impactLight');
    onPress();
  };

  const getButtonStyle = () => {
    let icon;
    let backgroundColor = colors.buttonColor;
    let textColor = colors.text;

    const iconProps = {
      size: 30,
      color: colors.background,
    };

    switch (label) {
      case '×':
        icon = <CustomIcon name="multiply" {...iconProps} />;
        break;
      case '÷':
        icon = <CustomIcon name="divide" {...iconProps} />;
        break;
      case '-':
        icon = <CustomIcon name="subtract" {...iconProps} />;
        break;
      case '+':
        icon = <CustomIcon name="add" {...iconProps} />;
        break;
      case '=':
        icon = <CustomIcon name="equal" {...iconProps} />;
        break;
      case 'AC':
        icon = (
          <Text
            variant="headlineLarge"
            style={{
              color: colors.colorBlack,
              fontFamily: 'InterTight-Medium',
            }}>
            {firstOperand !== '' ? 'C' : 'AC'}
          </Text>
        );
        break;
      case '+/-':
        icon = (
          <CustomIcon name="plus-minus" size={33} color={colors.colorBlack} />
        );
        break;
      case '%':
        icon = (
          <CustomIcon name="percent" size={35} color={colors.colorBlack} />
        );
        break;
      default:
        icon = label;
        break;
    }

    const isOperatorButton =
      label === '/' ||
      label === '×' ||
      label === '÷' ||
      label === '-' ||
      label === '+' ||
      label === '=';

    const isSpecialButton = label === 'AC' || label === '+/-' || label === '%';

    if (isOperatorButton) {
      backgroundColor = colors.activeButtonColor;
      textColor = colors.background;
    } else if (isSpecialButton) {
      backgroundColor = colors.activeButtonColor2;
      textColor = colors.background;
    }

    return {icon, backgroundColor, textColor};
  };

  const {icon, backgroundColor, textColor} = getButtonStyle();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableRipple
          onPress={handlePress}
          rippleColor={'#888'}
          style={[
            styles.button,
            label === '0'
              ? {
                  alignItems: 'flex-start',
                  paddingStart: 28,
                }
              : {
                  alignItems: 'center',
                },
            {
              backgroundColor,
              width: buttonWidth,
              height: buttonHeight,
            },
          ]}>
          <Text
            variant="headlineLarge"
            style={{
              color: textColor,
              fontFamily: 'InterTight-Regular',
            }}>
            {icon}
          </Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Dimensions.get('window').height * 0.01,
    marginVertical: Dimensions.get('window').height * 0.01,
  },
  buttonContainer: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default memo(CalcButton);
