const arrayByEntityId = (array: Array<any>) => {
  return array.reduce((obj, entity) => {
    return {
      ...obj,
      [entity.id]: entity,
    };
  }, {});
};

export default {
  arrayByEntityId,
};
