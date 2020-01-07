export const parseIntegerQueryParam = (param, defaultValue) => {
  let result = parseInt(param, 10);

  if (!isNaN(result)) {
    return result;
  }

  if (defaultValue) {
    return defaultValue;
  }

  return null;
};

export const parseDateTimeQueryParam = (param, defaultValue) => {
  if (param) {
    return new Date(param).toISOString();
  } else if (defaultValue) {
    return new Date(defaultValue).toISOString();
  }

  return null;
};
