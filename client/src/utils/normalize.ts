import {WithId} from '../interfaces/WithId';

const arrayByEntityId = <T extends WithId>(
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
