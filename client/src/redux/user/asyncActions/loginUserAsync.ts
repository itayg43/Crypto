import {AppDispatch} from '../../store';
import {loginUser, loginUserSuccess, loginUserFail} from '../userSlice';
import usersService from '../../../services/usersService';
import errorHandler from '../../../utils/errorHandler';
import {AuthenticationFormValues} from '../../../components/forms/AuthenticationForm';
import initializeService from '../../../services/initializeService';

export const loginUserAsync =
  (values: AuthenticationFormValues) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loginUser());
      const user = await usersService.loginUser(values);
      await initializeService.initializeData(dispatch);
      dispatch(loginUserSuccess(user));
    } catch (error) {
      const message = errorHandler.extractMessage(error);
      dispatch(loginUserFail(message));
    }
  };
