import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
import { IHistory } from '../../@types/quiz';
import { orderByKey } from '../../hooks/orderByPlayed';
import getMoy from '../../hooks/getMoy';

interface HistoryState {
  moy: number;
  history: IHistory[];
  isLoading: boolean;
  error: boolean;
}

const initialState: HistoryState = {
  moy: 0,
  history: [],
  isLoading: false,
  error: false,
};

export const getHistory = createAsyncThunk(
  'history/get',
  async (id: number) => {
    const { data } = await axiosInstance.get(`/score/${id}`);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return data as { scores: IHistory[] };
  }
);
export const postHistory = createAsyncThunk(
  'score/post',
  async (header: {
    score: number;
    max_score: number;
    user_id: number;
    quiz_id: number;
  }) => {
    const { data } = await axiosInstance.post('/score', header);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return data as IHistory;
  }
);
const historyReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getHistory.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.moy = getMoy(action.payload.scores);
      state.history = orderByKey(action.payload.scores);
      state.error = false;
    })
    .addCase(getHistory.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    })
    .addCase(postHistory.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(postHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.history.unshift(action.payload);
      state.moy = getMoy(state.history);
      state.error = false;
    })
    .addCase(postHistory.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
});

export default historyReducer;
