import {AppDispatch} from '../../store';
import {
  deleteHoldingById,
  deleteHoldingByIdSuccess,
  deleteHoldingByIdFail,
} from '../holdingsSlice';
import errorHandler from '../../../utils/errorHandler';
import holdingsService from '../../../services/holdingsService';

export const deleteHoldingByIdAsync =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(deleteHoldingById());
      await holdingsService.deleteHolding(id);
      dispatch(deleteHoldingByIdSuccess(id));
    } catch (error) {
      const message = errorHandler.extractMessage(error);
      dispatch(deleteHoldingByIdFail(message));
    }
  };
