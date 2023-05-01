const STATUS_CODE = {
  ERROR: {
    CLIENT: {
      BAD_REQUEST: 400,
      unauthorized: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
    },
    SERVER: {
      INTERNAL: 500,
    },
  },
  SUCCESS: {
    OK: 200,
    CREATED: 201,
  },
};

module.exports = {
  STATUS_CODE,
};
