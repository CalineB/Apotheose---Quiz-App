import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
import { IFiltre } from '../../@types/quiz';

interface FiltreState {
  levels: IFiltre[];
  tags: IFiltre[];
  isLoading?: boolean;
  error: boolean;
}

const initialState: FiltreState = {
  levels: [],
  tags: [],
  isLoading: false,
  error: false,
};

export const getFilter = createAsyncThunk('filter/fetch-filter', async () => {
  const { data } = await axiosInstance.get(`/filters`);
  return data as FiltreState;
});

export const addTag = createAsyncThunk(
  'filter/add-Tag',
  async (header: { name: string }) => {
    const { data } = await axiosInstance.post(`/admin/tag`, header);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return data as IFiltre;
  }
);
export const addLevel = createAsyncThunk(
  'filter/add-Level',
  async (header: { name: string }) => {
    const { data } = await axiosInstance.post(`/admin/level`, header);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return data as IFiltre;
  }
);
export const deleteTag = createAsyncThunk(
  'filter/delete-Tag',
  async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/tag/${id}`);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return id;
  }
);
export const deleteLevel = createAsyncThunk(
  'filter/delete-Level',
  async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/level/${id}`);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return id;
  }
);
export const patchTag = createAsyncThunk(
  'filter/patch-Tag',
  async (header: IFiltre) => {
    const { data } = await axiosInstance.patch(
      `/admin/tag/${header.id}`,
      header
    );
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return data as IFiltre;
  }
);
export const patchLevel = createAsyncThunk(
  'filter/patch-Level',
  async (header: IFiltre) => {
    const { data } = await axiosInstance.patch(
      `/admin/level/${header.id}`,
      header
    );
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return data as IFiltre;
  }
);
const FiltreReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getFilter.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getFilter.fulfilled, (state, action) => {
      state.levels = action.payload.levels;
      state.tags = action.payload.tags;
      state.isLoading = false;
      state.error = false;
    })
    .addCase(addTag.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addTag.fulfilled, (state, action) => {
      state.tags = [...state.tags, action.payload];
      state.isLoading = false;
      state.error = false;
    })
    .addCase(addTag.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    })
    .addCase(addLevel.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addLevel.fulfilled, (state, action) => {
      state.levels = [action.payload, ...state.levels];
      state.isLoading = false;
      state.error = false;
    })
    .addCase(addLevel.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    })
    .addCase(deleteTag.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteTag.fulfilled, (state, action) => {
      state.tags = state.tags.filter((tag) => tag.id !== action.payload);
      state.isLoading = false;
      state.error = false;
    })
    .addCase(deleteTag.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    })
    .addCase(deleteLevel.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteLevel.fulfilled, (state, action) => {
      state.levels = state.levels.filter(
        (level) => level.id !== action.payload
      );
      state.isLoading = false;
      state.error = false;
    })
    .addCase(deleteLevel.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    })
    .addCase(patchTag.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(patchTag.fulfilled, (state, action) => {
      const indexOfTag = state.tags.findIndex(
        (tag) => tag.id === action.payload.id
      );
      state.tags[indexOfTag].name = action.payload.name;
      state.isLoading = false;
      state.error = false;
    })
    .addCase(patchTag.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    })
    .addCase(patchLevel.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(patchLevel.fulfilled, (state, action) => {
      const indexOfLevel = state.levels.findIndex(
        (level) => level.id === action.payload.id
      );
      state.levels[indexOfLevel].name = action.payload.name;
      state.isLoading = false;
      state.error = false;
    })
    .addCase(patchLevel.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
});

export default FiltreReducer;
