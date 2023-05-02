import {HoldingJSON} from '../interfaces/HoldingJSON';
import {Holding} from '../entities/Holding';
import coinsService from './coinsService';
import backendApiClient, {BackendApiRoute} from '../clients/backendApiClient';

const HOLDINGS_ROUTE = BackendApiRoute.holdings;

const DEFAULT_HOLDING_JSON: HoldingJSON = {
  id: 0,
  uid: 0,
  cid: '',
  quantity: 0,
};

const getHoldings = async () => {
  const {data} = await backendApiClient.get<HoldingJSON[]>(
    `/${HOLDINGS_ROUTE}`,
  );

  if (data.length === 0) {
    return [];
  }

  const ids = data.map(i => i.cid).join(',');
  const coins = await coinsService.getCoinsByIds(ids);
  return coins.map(c => {
    const storedHoldingJSON =
      data.find(i => i.cid === c.id) ?? DEFAULT_HOLDING_JSON;
    return new Holding(storedHoldingJSON.id, c, storedHoldingJSON.quantity);
  });
};

const addHolding = async (cid: string, quantity: number) => {
  const {data} = await backendApiClient.post<HoldingJSON>(
    `/${HOLDINGS_ROUTE}`,
    {
      cid,
      quantity,
    },
  );
  return data;
};

const updateHoldingQuantity = async (id: number, quantity: number) => {
  await backendApiClient.patch(`/${HOLDINGS_ROUTE}/updateQuantity/${id}`, {
    quantity,
  });
};

const deleteHolding = async (id: number) => {
  await backendApiClient.delete(`/${HOLDINGS_ROUTE}/${id}`);
};

export default {
  getHoldings,
  addHolding,
  updateHoldingQuantity,
  deleteHolding,
};
