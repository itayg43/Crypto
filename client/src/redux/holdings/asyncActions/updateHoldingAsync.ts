import {AppDispatch, RootState} from '../../store';
import {
  updateHolding,
  updateHoldingSuccess,
  updateHoldingFail,
} from '../holdingsSlice';
import errorHandler from '../../../utils/errorHandler';
import holdingsStorage from '../../../storage/holdingsStorage';
import {MarketAction} from '../../../enums/MarketAction';

export const updateHoldingAsync =
  (marketAction: MarketAction, id: string, quantity: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(updateHolding());
      const currentQuantity = getState().holdings.entities[id].quantity;
      const updatedQuantity =
        marketAction === MarketAction.buy
          ? currentQuantity + quantity
          : currentQuantity - quantity;
      await holdingsStorage.updateHolding(id, updatedQuantity);
      dispatch(updateHoldingSuccess({id, quantity: updatedQuantity}));
    } catch (error) {
      const message = errorHandler.extractMessage(error);
      dispatch(updateHoldingFail(message));
    }
  };
