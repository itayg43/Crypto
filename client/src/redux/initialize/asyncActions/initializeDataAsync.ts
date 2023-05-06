import {AppDispatch, RootState} from '../../store';
import {initializeData, initializeDataFinish} from '../initializeSlice';
import initializeService from '../../../services/initializeService';
import {tryAuthenticateUserAsync} from '../../user/asyncActions/tryAuthenticateUserAsync';

export const initializeDataAsync =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(initializeData());
    await Promise.all([dispatch(tryAuthenticateUserAsync())]);
    const user = getState().user.entity;
    if (user) {
      await initializeService.initializeData(dispatch);
    }
    dispatch(initializeDataFinish());
  };
