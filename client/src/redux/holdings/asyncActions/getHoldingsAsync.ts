import {AppDispatch} from '../../store';
import {
  getHoldings,
  getHoldingsSuccess,
  getHoldingsFail,
} from '../holdingsSlice';
import holdingsService from '../../../services/holdingsService';
import errorHandler from '../../../utils/errorHandler';

export const getHoldingsAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getHoldings());
    const holdings = await holdingsService.getHoldings();
    const normalizedHoldings = holdings.reduce((obj, curr) => {
      return {...obj, [curr.id]: curr};
    }, {});
    dispatch(getHoldingsSuccess(normalizedHoldings));
  } catch (error) {
    const message = errorHandler.extractErrorMessage(error);
    dispatch(getHoldingsFail(message));
  }
};
