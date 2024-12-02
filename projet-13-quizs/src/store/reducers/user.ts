import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { IRole } from '../../@types/user';
import axiosInstance from '../../utils/axios';

export interface IsLogged {
  isLogged?: boolean;
  id: number;
  pseudo: string;
  role: IRole;
  isLoading: boolean;
  error: boolean;
  email: string;
  registered: boolean;
  checkedError: boolean;
}

const initialState: IsLogged = {
  isLogged: false,
  id: 0,
  pseudo: '',
  role: { name: '', id: 0 },
  isLoading: false,
  error: false,
  email: '',
  registered: false,
  checkedError: false,
};

export const checkUser = createAsyncThunk('user/checked', async () => {
  const { data } = await axiosInstance.get('/user');
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
  return 'OK';
});

export const checkAdmin = createAsyncThunk('admin/checked', async () => {
  const { data } = await axiosInstance.get('/admin');
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
  return 'OK';
});

export const modifProfil = createAsyncThunk(
  'user/patch-modif',
  async (header: { [k: string]: string | number }) => {
    const { data } = await axiosInstance.patch(`/user/${header.id}`, header);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.removeItem('token');
    localStorage.setItem('token', data.accessToken);
    return data as {
      id: number;
      pseudo: string;
      role: IRole;
      email: string;
    };
  }
);

export const deleteProfil = createAsyncThunk(
  'user/delete-profil',
  async (id: number) => {
    const { data } = await axiosInstance.delete(`/user/${id}`);
    return id;
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (header: { [k: string]: string }) => {
    const { data } = await axiosInstance.post('/login', header);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    localStorage.setItem('token', data.accessToken);
    delete data.accessToken;
    return data as {
      id: number;
      pseudo: string;
      role: IRole;
      email: string;
    };
  }
);

export const relog = createAsyncThunk('user/relog', async () => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token'
  )}`;
  const { data } = await axiosInstance.post('/relog');
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
  localStorage.removeItem('token');
  localStorage.setItem('token', data.accessToken);
  delete data.accessToken;
  return data as {
    id: number;
    pseudo: string;
    role: IRole;
    email: string;
  };
});

export const logout = createAction('user/logout');

export const register = createAsyncThunk(
  'user/register',
  async (header: { [k: string]: string }) => {
    const { data } = await axiosInstance.post('/register', header);
    return data as string;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.pseudo = action.payload.pseudo;
      state.email = action.payload.email;
      state.error = false;
      state.registered = false;
    })
    .addCase(login.rejected, (state, action) => {
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common.Authorization;
      state.isLoading = false;
      state.error = true;
      state.registered = false;
    })
    .addCase(relog.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(relog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.pseudo = action.payload.pseudo;
      state.email = action.payload.email;
      state.error = false;
      state.registered = false;
    })
    .addCase(relog.rejected, (state) => {
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common.Authorization;
      state.isLoading = false;
      state.registered = false;
    })
    .addCase(logout, (state) => {
      state.isLogged = false;
      state.pseudo = '';
      state.email = '';
      state.id = 0;
      state.role = { name: '', id: 0 };
      state.error = false;
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common.Authorization;
    })
    .addCase(register.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(register.fulfilled, (state) => {
      state.isLoading = false;
      state.error = false;
      state.registered = true;
    })
    .addCase(register.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    })
    .addCase(modifProfil.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(modifProfil.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pseudo = action.payload.pseudo;
      state.email = action.payload.email;
    })
    .addCase(modifProfil.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    })
    .addCase(deleteProfil.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteProfil.fulfilled, (state) => {
      state.isLoading = false;
      state.isLogged = false;
      state.pseudo = '';
      state.email = '';
      state.role = { name: '', id: 0 };
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common.Authorization;
      state.error = false;
    })
    .addCase(deleteProfil.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    })
    .addCase(checkUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(checkUser.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(checkUser.rejected, (state) => {
      state.isLoading = false;
      state.checkedError = true;
    })
    .addCase(checkAdmin.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(checkAdmin.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(checkAdmin.rejected, (state) => {
      state.isLoading = false;
      state.checkedError = true;
    });
});

export default userReducer;
