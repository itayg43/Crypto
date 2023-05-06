import {AppDispatch} from '../redux/store';
import {getHoldingsAsync} from '../redux/holdings/asyncActions/getHoldingsAsync';
import {getCoinsAsync} from '../redux/coins/asyncActions/getCoinsAsync';

const initializeData = async (dispatch: AppDispatch) => {
  await Promise.all([dispatch(getHoldingsAsync()), dispatch(getCoinsAsync())]);
};

const initializeDataAfterRegistration = async (dispact: AppDispatch) => {
  await dispact(getCoinsAsync());
};

export default {
  initializeData,
  initializeDataAfterRegistration,
};
