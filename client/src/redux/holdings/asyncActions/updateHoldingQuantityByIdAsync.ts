import {AppDispatch, RootState} from '../../store';
import {
  updateHoldingQuantityById,
  updateHoldingQuantityByIdSuccess,
  updateHoldingQuantityByIdFail,
} from '../holdingsSlice';
import errorHandler from '../../../utils/errorHandler';
import holdingsService from '../../../services/holdingsService';
import {MarketAction} from '../../../enums/MarketAction';

export const updateHoldingQuantityByIdAsync =
  (marketAction: MarketAction, id: number, quantity: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(updateHoldingQuantityById());
      const currentQuantity = getState().holdings.entities[id].quantity;
      const updatedQuantity =
        marketAction === MarketAction.buy
          ? currentQuantity + quantity
          : currentQuantity - quantity;
      await holdingsService.updateHoldingQuantity(id, updatedQuantity);
      dispatch(
        updateHoldingQuantityByIdSuccess({id, quantity: updatedQuantity}),
      );
    } catch (error) {
      const message = errorHandler.extractMessage(error);
      dispatch(updateHoldingQuantityByIdFail(message));
    }
  };
