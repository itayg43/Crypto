const express = require("express");

const holdingsController = require("./holdings-controller");
const authenticationMiddleware = require("../../../middlewares/authentication-middleware");

const holdingsRouter = express.Router();

holdingsRouter.post(
  "/",
  authenticationMiddleware,
  holdingsController.addHolding
);

holdingsRouter.get(
  "/",
  authenticationMiddleware,
  holdingsController.getHoldingsByUid
);

holdingsRouter.patch(
  "/updateQuantity/:id",
  authenticationMiddleware,
  holdingsController.updateHoldingQuantityById
);

holdingsRouter.delete(
  "/:id",
  authenticationMiddleware,
  holdingsController.deleteHoldingById
);

module.exports = holdingsRouter;
