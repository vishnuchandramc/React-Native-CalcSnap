import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  firstOperand: '',
  operator: '',
  secondOperand: '',
  result: '',
  isHapticEnabled: true,
  isDarkModeEnabled: true,
  originalFirstOperand: '',
  originalSecondOperand: '',
  isAutoCalculationEnabled: false,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setHapticState: (state, action) => {
      state.isHapticEnabled = action.payload;
    },
    setThemeState: (state, action) => {
      state.isDarkModeEnabled = action.payload;
    },
    setFirstOperand: (state, action) => {
      state.firstOperand = parseFloat(action.payload);
      state.originalFirstOperand = parseFloat(action.payload);
    },
    setDecimal: state => {
      const {firstOperand, operator, secondOperand, result} = state;

      if (result !== '') {
        state.firstOperand = result; // Set the first operand as the decimal value
        state.result = ''; // Clear the result
      } else if (!operator) {
        if (firstOperand === '') {
          state.firstOperand = '0.';
          state.originalFirstOperand = '0.';
        } else if (!firstOperand.includes('.')) {
          state.firstOperand += '.';
          state.originalFirstOperand += '.';
        }
      } else {
        if (secondOperand === '') {
          state.secondOperand = '0.';
          state.originalSecondOperand = '0.';
        } else if (!secondOperand.includes('.')) {
          state.secondOperand += '.';
          state.originalSecondOperand += '.';
        }
      }
    },

    setNumber: (state, action) => {
      const {firstOperand, operator, secondOperand} = state;
      const {payload} = action;
      const MAX_LENGTH = 10;

      if (!operator) {
        if (firstOperand === '0' && payload !== '.') {
          state.firstOperand = payload;
          state.originalFirstOperand = payload;
        } else {
          const updatedFirstOperand = `${firstOperand}${payload}`;
          if (updatedFirstOperand.length <= MAX_LENGTH) {
            state.firstOperand = updatedFirstOperand;
            state.originalFirstOperand = updatedFirstOperand;
          }
        }
      } else {
        if (state.secondOperand === '0' && payload !== '.') {
          state.secondOperand = payload;
          state.originalSecondOperand = payload;
        } else {
          const updatedSecondOperand = `${secondOperand}${payload}`;
          if (updatedSecondOperand.length <= MAX_LENGTH) {
            state.secondOperand = updatedSecondOperand;
            state.originalSecondOperand = updatedSecondOperand;
          }
        }
      }
    },

    setOperator: (state, action) => {
      const {firstOperand, operator, secondOperand} = state;
      const {payload} = action;

      if (firstOperand !== '' && operator !== '' && secondOperand !== '') {
        // Perform the calculation first
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(secondOperand);

        let result;
        switch (operator) {
          case '+':
            result = num1 + num2;
            break;
          case '-':
            result = num1 - num2;
            break;
          case '×':
            result = num1 * num2;
            break;
          case '÷':
            result = num1 / num2;
            break;
          default:
            result = '';
        }

        state.firstOperand = state.isAutoCalculationEnabled
          ? firstOperand
          : result.toString();
        state.secondOperand = '';
        state.result = '';
      }

      state.operator = payload;
    },

    clear: state => {
      const {operator, result} = state;

      if (result !== '') {
        // Clear all values when there is a result
        state.firstOperand = '';
        state.operator = '';
        state.secondOperand = '';
        state.result = '';
      } else if (state.secondOperand !== '') {
        // Clear the second operand when it is present
        state.secondOperand = '';
      } else {
        // Clear all values when AC is pressed again
        state.firstOperand = '';
        state.operator = '';
        state.secondOperand = '';
        state.result = '';
        state.originalFirstOperand = '';
        state.originalSecondOperand = '';
        state.isAutoCalculationEnabled = false;
      }
    },

    removeRightDigit: state => {
      const {firstOperand, operator, secondOperand} = state;

      if (!operator) {
        // Remove the rightmost digit from the first operand
        state.firstOperand = firstOperand.slice(0, -1);
        state.originalFirstOperand = state.firstOperand;
      } else if (secondOperand !== '') {
        // Remove the rightmost digit from the second operand
        state.secondOperand = secondOperand.slice(0, -1);
        state.originalSecondOperand = state.secondOperand;
      }
    },

    calculate: state => {
      const {
        firstOperand,
        operator,
        secondOperand,
        result,
        originalFirstOperand,
        originalSecondOperand,
      } = state;

      let num1 = parseFloat(firstOperand);
      let num2 = parseFloat(secondOperand);

      console.log('Num1---num2----', num1, num2);

      // Handle cases where an operand is not a valid number
      // if (isNaN(num1)) {
      num1 = result === '' ? parseFloat(firstOperand) : parseFloat(result);
      // }

      num2 =
        originalSecondOperand !== ''
          ? parseFloat(originalSecondOperand)
          : parseFloat(originalFirstOperand);

      let results;
      switch (operator) {
        case '+':
          results = num1 + num2;
          break;
        case '-':
          results = num1 - num2;
          break;
        case '×':
          results = num1 * num2;
          break;
        case '÷':
          results = num1 / num2;
          break;
        default:
          results = '';
      }

      state.result = results.toString();
      state.firstOperand = result !== '' ? result : results.toString();
      state.operator = operator;
      state.isAutoCalculationEnabled = true;
      state.secondOperand =
        result !== '' ? originalFirstOperand : secondOperand;
    },

    clearResult: state => {
      state.result = '';
    },
    invertNumber: state => {
      const {firstOperand, secondOperand, operator, result} = state;

      if (!operator) {
        if (firstOperand !== '') {
          state.firstOperand = (-1 * parseFloat(firstOperand)).toString();
          state.originalFirstOperand = (
            -1 * parseFloat(firstOperand)
          ).toString();
        }
      } else {
        if (state.secondOperand !== '') {
          state.secondOperand = (-1 * parseFloat(secondOperand)).toString();
          state.originalSecondOperand = (
            -1 * parseFloat(secondOperand)
          ).toString();
        }
      }

      if (result !== '') {
        state.result = (-1 * parseFloat(result)).toString();
      }
    },

    calculatePercentage: state => {
      const {firstOperand, operator, secondOperand, result} = state;

      if (
        result !== '' ||
        (firstOperand !== '' && !operator) ||
        (secondOperand !== '' && operator)
      ) {
        // Perform the percentage calculation when there is a result, a value in firstOperand, or a value in secondOperand with an operator
        let percentage;
        if (result !== '') {
          percentage = (parseFloat(result) / 100).toString();
          state.result = percentage;
        } else if (!operator) {
          percentage = (parseFloat(firstOperand) / 100).toString();
          state.firstOperand = percentage;
          state.originalFirstOperand = percentage;
        } else {
          percentage = (parseFloat(secondOperand) / 100).toString();
          state.secondOperand = percentage;
          state.originalSecondOperand = percentage;
        }
      }
    },
  },
});

export const {
  setHapticState,
  setThemeState,
  setFirstOperand,
  setNumber,
  setOperator,
  clear,
  calculate,
  clearResult,
  setDecimal,
  invertNumber,
  calculatePercentage,
  removeRightDigit,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
