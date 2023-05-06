import {AppDispatch} from '../redux/store';
import {resetHoldingsState} from '../redux/holdings/holdingsSlice';
import {resetCoinsState} from '../redux/coins/coinsSlice';

const deinitializeData = async (dispatch: AppDispatch) => {
  await Promise.all([
    dispatch(resetHoldingsState()),
    dispatch(resetCoinsState()),
  ]);
};

export default {
  deinitializeData,
};
