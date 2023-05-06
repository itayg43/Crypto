import {RootState} from '../store';

export const selectUserStatus = (state: RootState) => state.user.status;

export const selectUserMessage = (state: RootState) => state.user.message;

export const selectUser = (state: RootState) => state.user.entity;
