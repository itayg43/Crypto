import {AppDispatch} from '../../store';
import {addHolding, addHoldingSuccess, addHoldingFail} from '../holdingsSlice';
import errorHandler from '../../../utils/errorHandler';
import {Coin} from '../../../entities/Coin';
import {Holding} from '../../../entities/Holding';
import holdingsService from '../../../services/holdingsService';

export const addHoldingAsync =
  (coin: Coin, quantity: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(addHolding());
      const holding = new Holding(coin, quantity);
      await holdingsService.addHolding(holding);
      dispatch(addHoldingSuccess(holding));
    } catch (error) {
      const message = errorHandler.extractMessage(error);
      dispatch(addHoldingFail(message));
    }
  };
