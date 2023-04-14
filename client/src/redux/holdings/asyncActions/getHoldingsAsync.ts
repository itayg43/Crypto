import {AppDispatch} from '../../store';
import {
  getHoldings,
  getHoldingsSuccess,
  getHoldingsFail,
} from '../holdingsSlice';
import holdingsService from '../../../services/holdingsService';
import errorHandler from '../../../utils/errorHandler';
import {Holding} from '../../../entities/Holding';

export const getHoldingsAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getHoldings());
    const holdings = await holdingsService.getHoldings();
    const normalizedHoldings = normalizeHoldings(holdings);
    dispatch(getHoldingsSuccess(normalizedHoldings));
  } catch (error) {
    const message = errorHandler.extractErrorMessage(error);
    dispatch(getHoldingsFail(message));
  }
};

const normalizeHoldings = (array: Holding[]) => {
  return array.reduce((obj, curr) => {
    return {...obj, [curr.id]: curr};
  }, {});
};
