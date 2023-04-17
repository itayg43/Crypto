import {AppDispatch} from '../../store';
import {getCoins, getCoinsSuccess, getCoinsFail} from '../coinsSlice';
import coinsService from '../../../services/coinsService';
import errorHandler from '../../../utils/errorHandler';
import normalize from '../../../utils/normalize';

export const getCoinsAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getCoins());
    const coins = await coinsService.getCoins();
    const normalizedCoins = normalize.arrayByEntityId(coins);
    dispatch(getCoinsSuccess(normalizedCoins));
  } catch (error) {
    const message = errorHandler.extractMessage(error);
    dispatch(getCoinsFail(message));
  }
};
