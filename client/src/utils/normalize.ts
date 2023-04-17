interface ById {
  id: string;
}

const arrayByEntityId = <T extends ById>(
  array: T[],
): {
  [s: string]: T;
} => {
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
