import {AppDispatch} from '../../store';
import {
  getHoldings,
  getHoldingsSuccess,
  getHoldingsFail,
} from '../holdingsSlice';
import holdingsService from '../../../services/holdingsService';
import errorHandler from '../../../utils/errorHandler';
import normalize from '../../../utils/normalize';

export const getHoldingsAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getHoldings());
    const holdings = await holdingsService.getHoldings();
    const normalizedHoldings = normalize.arrayByEntityId(holdings);
    dispatch(getHoldingsSuccess(normalizedHoldings));
  } catch (error) {
    const message = errorHandler.extractMessage(error);
    dispatch(getHoldingsFail(message));
  }
};
