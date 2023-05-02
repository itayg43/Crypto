const { Holding } = require("../../../db/models");

async function addHolding(uid, cid, quantity) {
  return await Holding.create({ uid, cid, quantity });
}

async function getHoldingById(id) {
  return await Holding.findByPk(id);
}

async function getHoldingByUidAndCid(uid, cid) {
  return await Holding.findOne({
    where: {
      uid,
      cid,
    },
  });
}

async function getHoldingsByUid(uid) {
  return await Holding.findAll({
    where: {
      uid,
    },
  });
}

async function updateHoldingQuantityById(id, quantity) {
  await Holding.update(
    { quantity },
    {
      where: {
        id,
      },
    }
  );
}

async function deleteHoldingById(id) {
  await Holding.destroy({
    where: {
      id,
    },
  });
}

module.exports = {
  addHolding,
  getHoldingById,
  getHoldingByUidAndCid,
  getHoldingsByUid,
  updateHoldingQuantityById,
  deleteHoldingById,
};
