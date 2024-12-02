import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';

import { IQuestion, IQuiz } from '../../@types/quiz';

interface QuizState {
  quiz: IQuiz;
  isLoading: boolean;
  error: boolean;
}

const initialState: QuizState = {
  quiz: { id: 0, name: '', tag: '', level: '', questions: [] },
  isLoading: false,
  error: false,
};

export const fetchOneQuiz = createAsyncThunk(
  'quiz/fetch-one-quiz',
  async (id: number) => {
    const { data } = await axiosInstance.get(`/quiz/${id}`);
    return data as IQuiz;
  }
);

export const updateQuestions = createAsyncThunk(
  'question/update-question',
  async (header: IQuestion) => {
    const { data } = await axiosInstance.patch(
      `/admin/question/${header.id}`,
      header
    );
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return header as IQuestion;
  }
);
export const deleteQuestions = createAsyncThunk(
  'question/delete',
  async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/question/${id}`);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return id as number;
  }
);

export const addQuestions = createAsyncThunk(
  'question/add-question',
  async (header: {
    id: number;
    description: string;
    answers: { description: string; is_good_answer: boolean }[];
  }) => {
    const { data } = await axiosInstance.post(
      `/admin/quiz/${header.id}`,
      header
    );
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    header.id = data.id;
    return header as IQuestion;
  }
);

const quizReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOneQuiz.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOneQuiz.fulfilled, (state, action) => {
      state.quiz = action.payload;
      state.isLoading = false;
    })
    .addCase(updateQuestions.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateQuestions.fulfilled, (state, action) => {
      const indexOfQuestion = state.quiz.questions.findIndex(
        (question) => question.id === action.payload.id
      );
      state.quiz.questions[indexOfQuestion] = action.payload;
      state.isLoading = false;
      state.error = false;
    })
    .addCase(updateQuestions.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    })
    .addCase(deleteQuestions.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(deleteQuestions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.quiz.questions = state.quiz.questions.filter(
        (question) => question.id !== action.payload
      );
      state.error = false;
    })
    .addCase(deleteQuestions.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    })
    .addCase(addQuestions.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addQuestions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.quiz.questions.push(action.payload);
      state.error = false;
    })
    .addCase(addQuestions.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
});

export default quizReducer;
