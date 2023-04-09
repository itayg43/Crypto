import {AppDispatch} from '../redux/store';
import {getCoinsAsync} from '../redux/coins/asyncActions/getCoinsAsync';

const initializeData = async (dispatch: AppDispatch) => {
  await Promise.all([dispatch(getCoinsAsync())]);
};

export default {
  initializeData,
};
