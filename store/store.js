import {configureStore} from '@reduxjs/toolkit';
import calculatorReducer from './slice';

const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
  },
});

export default store;
