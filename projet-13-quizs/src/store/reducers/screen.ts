import { createAction, createReducer } from '@reduxjs/toolkit';

interface ScreenState {
  width: number;
  height: number;
}

const initialState: ScreenState = {
  width: 0,
  height: 0,
};

export const updtateDimension = createAction<ScreenState>('screen/update');

const screenReducer = createReducer(initialState, (builder) => {
  builder.addCase(updtateDimension, (state, action) => {
    state.width = action.payload.width;
    state.height = action.payload.height;
  });
});

export default screenReducer;
