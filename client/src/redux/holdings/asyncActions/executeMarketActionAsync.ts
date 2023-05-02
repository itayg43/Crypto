import {AppDispatch, RootState} from '../../store';
import {MarketAction} from '../../../enums/MarketAction';
import {addHoldingAsync} from './addHoldingAsync';
import {updateHoldingQuantityByIdAsync} from './updateHoldingQuantityByIdAsync';
import {deleteHoldingByIdAsync} from './deleteHoldingByIdAsync';

export const executeMarketActionAsync =
  (action: MarketAction, id: number, quantity: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const holding = getState().holdings.entities[id];
    if (!holding) {
      const coin = getState().coins.entities[id];
      return dispatch(addHoldingAsync(coin, quantity));
    }
    switch (action) {
      case MarketAction.buy: {
        return dispatch(updateHoldingQuantityByIdAsync(action, id, quantity));
      }

      case MarketAction.sell: {
        return holding.quantity === quantity
          ? dispatch(deleteHoldingByIdAsync(id))
          : dispatch(updateHoldingQuantityByIdAsync(action, id, quantity));
      }
    }
  };
