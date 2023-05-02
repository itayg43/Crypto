const { STATUS_CODE } = require("../../../constants");

class NoHoldingWithGivenId extends Error {
  constructor(id) {
    super(`No holding with given id: ${id}`);
    this.statusCode = STATUS_CODE.ERROR.CLIENT.BAD_REQUEST;
  }
}

class HoldingWithGivenCidAlreadyExist extends Error {
  constructor(cid) {
    super(`Holding with given coid id: ${cid} already exist.`);
    this.statusCode = STATUS_CODE.ERROR.CLIENT.BAD_REQUEST;
  }
}

module.exports = {
  NoHoldingWithGivenId,
  HoldingWithGivenCidAlreadyExist,
};
