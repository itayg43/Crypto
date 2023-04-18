import {AppDispatch} from '../../store';
import {
  deleteHolding,
  deleteHoldingSuccess,
  deleteHoldingFail,
} from '../holdingsSlice';
import errorHandler from '../../../utils/errorHandler';
import holdingsStorage from '../../../storage/holdingsStorage';

export const deleteHoldingAsync =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(deleteHolding());
      await holdingsStorage.deleteHolding(id);
      dispatch(deleteHoldingSuccess(id));
    } catch (error) {
      const message = errorHandler.extractMessage(error);
      dispatch(deleteHoldingFail(message));
    }
  };
