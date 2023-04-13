import {AppDispatch} from '../../store';
import {getCoins, getCoinsSuccess, getCoinsFail} from '../coinsSlice';
import coinsService from '../../../services/coinsService';
import errorHandler from '../../../utils/errorHandler';

export const getCoinsAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getCoins());
    const coins = await coinsService.getCoins();
    const normalizedCoins = coins.reduce((obj, curr) => {
      return {...obj, [curr.id]: curr};
    }, {});
    dispatch(getCoinsSuccess(normalizedCoins));
  } catch (error) {
    const message = errorHandler.extractErrorMessage(error);
    dispatch(getCoinsFail(message));
  }
};
