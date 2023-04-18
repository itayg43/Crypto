import {AppDispatch, RootState} from '../../store';
import {MarketAction} from '../../../enums/MarketAction';
import {addHoldingAsync} from './addHoldingAsync';
import {updateHoldingAsync} from './updateHoldingAsync';
import {deleteHoldingAsync} from './deleteHoldingAsync';

export const executeMarketActionAsync =
  (marketAction: MarketAction, id: string, quantity: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const holding = getState().holdings.entities[id];
    if (!holding) {
      const coin = getState().coins.entities[id];
      return dispatch(addHoldingAsync(coin, quantity));
    }
    switch (marketAction) {
      case MarketAction.buy: {
        return dispatch(updateHoldingAsync(marketAction, id, quantity));
      }

      case MarketAction.sell: {
        return holding.quantity === quantity
          ? dispatch(deleteHoldingAsync(id))
          : dispatch(updateHoldingAsync(marketAction, id, quantity));
      }
    }
  };
