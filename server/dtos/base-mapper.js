const _ = require("lodash");

class BaseMapper {
  static keys() {
    return ["id"];
  }

  static map(model) {
    return _.pick(model, this.keys());
  }
}

module.exports = {
  BaseMapper,
};
