import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import memberReducer from '../features/memberProcess';

export default configureStore({
  reducer: {
    counter: counterReducer,
    member: memberReducer
  },
});
