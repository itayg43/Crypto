import {AppDispatch} from '../../store';
import {
  deleteHolding,
  deleteHoldingSuccess,
  deleteHoldingFail,
} from '../holdingsSlice';
import errorHandler from '../../../utils/errorHandler';
import holdingsService from '../../../services/holdingsService';

export const deleteHoldingAsync =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(deleteHolding());
      await holdingsService.deleteHolding(id);
      dispatch(deleteHoldingSuccess(id));
    } catch (error) {
      const message = errorHandler.extractMessage(error);
      dispatch(deleteHoldingFail(message));
    }
  };
