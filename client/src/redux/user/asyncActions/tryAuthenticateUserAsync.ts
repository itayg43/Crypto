import {AppDispatch} from '../../store';
import {
  tryAuthenticateUser,
  tryAuthenticateUserFinish,
  tryAuthenticateUserFail,
} from '../userSlice';
import usersService from '../../../services/usersService';
import errorHandler from '../../../utils/errorHandler';

export const tryAuthenticateUserAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(tryAuthenticateUser());
    const user = await usersService.tryAuthenticateUser();
    dispatch(tryAuthenticateUserFinish(user));
  } catch (error) {
    const message = errorHandler.extractMessage(error);
    dispatch(tryAuthenticateUserFail(message));
  }
};
