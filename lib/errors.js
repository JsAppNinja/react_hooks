import { isEmpty } from 'lodash';

// @param error {Object}: The error object from GraphQL
// @param gqlPath {String|Array}: The path, or an array of paths to format
export const getValidationErrors = (error, gqlPath = null) => {
  const { graphQLErrors } = error;
  const isArr = Array.isArray(gqlPath);

  if (!isEmpty(graphQLErrors)) {
    // filter out errors that are validation errors and, if a path is specified,
    // only the errors for that path.
    const errors = graphQLErrors.filter(gqlError => {
      const { error_type, path } = gqlError;
      const isValidation = error_type === 'VALIDATION';

      if (gqlPath) {
        return isArr
          ? isValidation && gqlPath.includes(path[0])
          : isValidation && path[0] === gqlPath;
      }

      return isValidation;
    });

    // format for ease of use
    if (errors.length) {
      if (gqlPath && !isArr) {
        return errors[0].field_errors;
      }

      return errors.map(err => ({
        path: err.path[0],
        errors: err.field_errors
      }));
    }
  }

  return [];
};

export const getGeneralErrors = (error, gqlPath = null) => {
  const { graphQLErrors } = error;
  const isArr = Array.isArray(gqlPath);

  if (!isEmpty(graphQLErrors)) {
    const errors = graphQLErrors.filter(gqlError => {
      const { name, path } = gqlError;
      const isValidation = name === 'ValidationError';

      if (gqlPath) {
        return isArr
          ? !isValidation && gqlPath.includes(path[0])
          : !isValidation && path[0] === gqlPath;
      }

      return isValidation;
    });
    return { general: errors.map(e => e.message).join('\n') };
  }

  return [];
};
