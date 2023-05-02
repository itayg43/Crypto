const holdingsDataAccess = require("../data-access/holdings-data-access");

async function addHolding(uid, cid, quantity) {
  return await holdingsDataAccess.addHolding(uid, cid, quantity);
}

async function getHoldingsByUid(uid) {
  return await holdingsDataAccess.getHoldingsByUid(uid);
}

async function updateHoldingQuantityById(id, quantity) {
  const holding = await holdingsDataAccess.getHoldingById(id);

  if (!holding) {
    throw new Error("");
  }

  await holdingsDataAccess.updateHoldingQuantityById(id, quantity);
}

async function deleteHoldingById(id) {
  const holding = await holdingsDataAccess.getHoldingById(id);

  if (!holding) {
    throw new Error("");
  }

  await holdingsDataAccess.deleteHoldingById(id);
}

module.exports = {
  addHolding,
  getHoldingsByUid,
  updateHoldingQuantityById,
  deleteHoldingById,
};
