import {AppDispatch, RootState} from '../../store';
import {
  updateHoldingQuantity,
  updateHoldingQuantitySuccess,
  updateHoldingQuantityFail,
} from '../holdingsSlice';
import errorHandler from '../../../utils/errorHandler';
import holdingsService from '../../../services/holdingsService';
import {MarketAction} from '../../../enums/MarketAction';

export const updateHoldingQuantityAsync =
  (marketAction: MarketAction, id: string, quantity: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(updateHoldingQuantity());
      const currentQuantity = getState().holdings.entities[id].quantity;
      const updatedQuantity =
        marketAction === MarketAction.buy
          ? currentQuantity + quantity
          : currentQuantity - quantity;
      await holdingsService.updateHoldingQuantity(id, updatedQuantity);
      dispatch(updateHoldingQuantitySuccess({id, quantity: updatedQuantity}));
    } catch (error) {
      const message = errorHandler.extractMessage(error);
      dispatch(updateHoldingQuantityFail(message));
    }
  };
