import { createAction, createReducer } from '@reduxjs/toolkit';

interface darkState {
  dark: boolean;
}

const initialState: darkState = {
  dark: false,
};

export const updateDark = createAction('dark/switchMode');

const darkReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateDark, (state) => {
    state.dark = !state.dark;
    if (state.dark) {
      localStorage.setItem('dark', 'true');
    } else {
      localStorage.removeItem('dark');
    }
  });
});

export default darkReducer;
