const { STATUS_CODE } = require("../../../constants");
const holdingsService = require("../business-logic/holdings-service");

async function addHolding(req, res) {
  const { id: uid } = req.user;
  const { cid, quantity } = req.body;
  const holding = await holdingsService.addHolding(uid, cid, quantity);
  res.status(STATUS_CODE.SUCCESS.CREATED).json(holding);
}

async function getHoldingsByUid(req, res) {
  const { id: uid } = req.user;
  const holdings = await holdingsService.getHoldingsByUid(uid);
  res.status(STATUS_CODE.SUCCESS.OK).json(holdings);
}

async function updateHoldingQuantityById(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;
  await holdingsService.updateHoldingQuantityById(id, quantity);
  res.status(STATUS_CODE.SUCCESS.OK).send("OK");
}

async function deleteHoldingById(req, res) {
  const { id } = req.params;
  await holdingsService.deleteHoldingById(id);
  res.status(STATUS_CODE.SUCCESS.OK).send("OK");
}

module.exports = {
  addHolding,
  getHoldingsByUid,
  updateHoldingQuantityById,
  deleteHoldingById,
};
