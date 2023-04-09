import {AppDispatch} from '../../store';
import {initializeData, initializeDataFinish} from '../initializeSlice';
import initializeService from '../../../services/initializeService';

export const initializeDataAsync = () => async (dispatch: AppDispatch) => {
  dispatch(initializeData());
  await initializeService.initializeData(dispatch);
  dispatch(initializeDataFinish());
};
