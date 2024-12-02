import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
import { ICreateQuestion, ICreateQuiz, IListQuiz } from '../../@types/quiz';
import { orderByPlayed, orderByKey } from '../../hooks/orderByPlayed';

interface QuizState {
  list: IListQuiz[];
  listPlayed: IListQuiz[];
  createdQuiz: ICreateQuiz;
  isLoading: boolean;
  error: boolean;
}

const initialState: QuizState = {
  list: [],
  listPlayed: [],
  createdQuiz: { name: '', tag: '', level: '', question: [] },
  isLoading: false,
  error: false,
};

export const fetchQuiz = createAsyncThunk('quiz/fetch-quiz', async () => {
  const { data } = await axiosInstance.get(`/quiz`);

  return data as IListQuiz[];
});

export const updateQuiz = createAsyncThunk(
  'quiz/update-quiz',
  async (header: {
    id: number;
    name: string;
    tag: number | string;
    level: number | string;
  }) => {
    const { data } = await axiosInstance.patch(
      `/admin/quiz/${header.id}`,
      header
    );
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return data as IListQuiz;
  }
);

export const addQuestion = createAction<ICreateQuestion>(
  'createQuiz/addQuestion'
);
export const addQuiz = createAction<{
  name: string;
  tag: number;
  level: number;
}>('createQuiz/addQuiz');

export const postOneQuiz = createAsyncThunk(
  'quiz/post-one-quiz',
  async (header: ICreateQuiz) => {
    const { data } = await axiosInstance.post(`/admin/quiz`, header);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return data as IListQuiz;
  }
);

export const deleteQuiz = createAsyncThunk(
  'quiz/delete',
  async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/quiz/${id}`);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return id as number;
  }
);

const quizsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchQuiz.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchQuiz.fulfilled, (state, action) => {
      state.list = orderByKey(action.payload);
      state.listPlayed = orderByPlayed(action.payload).slice(0, 5);
      state.isLoading = false;
    })
    .addCase(updateQuiz.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateQuiz.fulfilled, (state, action) => {
      const indexOfQuiz = state.list.findIndex(
        (quiz) => quiz.id === action.payload.id
      );
      state.list[indexOfQuiz] = action.payload;
      state.isLoading = false;
      state.error = false;
    })
    .addCase(updateQuiz.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    })

    .addCase(addQuestion, (state, action) => {
      state.createdQuiz.question[action.payload.id] = action.payload;
    })

    .addCase(addQuiz, (state, action) => {
      state.createdQuiz.name = action.payload.name;
      state.createdQuiz.tag = action.payload.tag;
      state.createdQuiz.level = action.payload.level;
    })
    .addCase(postOneQuiz.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(postOneQuiz.fulfilled, (state, action) => {
      action.payload.played = 0;
      state.list.unshift(action.payload);
      state.listPlayed = orderByPlayed(state.list).slice(0, 5);
      state.createdQuiz = { name: '', tag: '', level: '', question: [] };
      state.isLoading = false;
      state.error = false;
    })
    .addCase(postOneQuiz.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    })
    .addCase(deleteQuiz.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteQuiz.fulfilled, (state, action) => {
      state.list = state.list.filter((quiz) => quiz.id !== action.payload);
      state.listPlayed = orderByPlayed(state.list).slice(0, 5);
      state.isLoading = false;
      state.error = false;
    })
    .addCase(deleteQuiz.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
});

export default quizsReducer;
