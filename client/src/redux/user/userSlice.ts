import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {ReducerStatus} from '../../enums/ReducerStatus';

export interface User {
  id: number;
  email: string;
}

interface UserState {
  status: ReducerStatus;
  message: string;
  entity: User | null;
}

const initialState: UserState = {
  status: ReducerStatus.idle,
  message: '',
  entity: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // register
    registerUser: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    registerUserSuccess: (state, action: PayloadAction<User>) => {
      state.status = ReducerStatus.idle;
      state.entity = action.payload;
    },
    registerUserFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },

    // login
    loginUser: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    loginUserSuccess: (state, action: PayloadAction<User>) => {
      state.status = ReducerStatus.idle;
      state.entity = action.payload;
    },
    loginUserFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },

    // authenticate
    tryAuthenticateUser: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    tryAuthenticateUserFinish: (state, action: PayloadAction<User | null>) => {
      state.status = ReducerStatus.finish;
      state.entity = action.payload;
    },
    tryAuthenticateUserFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },

    // logout
    logoutUser: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    logoutUserSuccess: state => {
      state.status = ReducerStatus.idle;
      state.entity = null;
    },
    logoutUserFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },

    // reset status & message
    resetUserStatus: state => {
      state.status = ReducerStatus.idle;
      state.message = '';
    },
  },
});

export const {
  registerUser,
  registerUserSuccess,
  registerUserFail,
  loginUser,
  loginUserSuccess,
  loginUserFail,
  tryAuthenticateUser,
  tryAuthenticateUserFinish,
  tryAuthenticateUserFail,
  logoutUser,
  logoutUserSuccess,
  logoutUserFail,
  resetUserStatus,
} = userSlice.actions;

export default userSlice.reducer;
