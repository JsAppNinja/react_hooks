import { cloneDeepWith } from 'lodash';

export const omitDeep = (collection, excludeKeys) => {
  const omitFn = value => {
    if (value && typeof value === 'object') {
      excludeKeys.forEach(key => {
        delete value[key];
      });
    }
  };

  return cloneDeepWith(collection, omitFn);
};
