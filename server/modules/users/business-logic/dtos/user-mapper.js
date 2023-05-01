const { BaseMapper } = require("../../../../dtos/base-mapper");

class UserMapper extends BaseMapper {
  static keys() {
    return ["id", "email"];
  }
}

module.exports = { UserMapper };
