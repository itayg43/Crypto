import {AppDispatch} from '../../store';
import {
  registerUser,
  registerUserSuccess,
  registerUserFail,
} from '../userSlice';
import usersService from '../../../services/usersService';
import errorHandler from '../../../utils/errorHandler';
import {AuthenticationFormValues} from '../../../components/forms/AuthenticationForm';
import initializeService from '../../../services/initializeService';

export const registerUserAsync =
  (values: AuthenticationFormValues) => async (dispatch: AppDispatch) => {
    try {
      dispatch(registerUser());
      const user = await usersService.registerUser(values);
      await initializeService.initializeDataAfterRegistration(dispatch);
      dispatch(registerUserSuccess(user));
    } catch (error) {
      const message = errorHandler.extractMessage(error);
      dispatch(registerUserFail(message));
    }
  };
