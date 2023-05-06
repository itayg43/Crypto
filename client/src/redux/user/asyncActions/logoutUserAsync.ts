import {AppDispatch} from '../../store';
import {logoutUser, logoutUserSuccess, logoutUserFail} from '../userSlice';
import usersService from '../../../services/usersService';
import errorHandler from '../../../utils/errorHandler';
import deinitializeService from '../../../services/deinitializeService';

export const logoutUserAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(logoutUser());
    await usersService.logoutUser();
    await deinitializeService.deinitializeData(dispatch);
    dispatch(logoutUserSuccess());
  } catch (error) {
    const message = errorHandler.extractMessage(error);
    dispatch(logoutUserFail(message));
  }
};
