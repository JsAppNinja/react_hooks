import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

const Field = ({ render, form, name, label, ...rest }) => {
  const { touched, errors } = form;
  const error = getIn(errors, name);
  const hasError = !!(getIn(touched, name) && error);

  return (
    <FormControl error={hasError} {...rest}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      {render({ hasError })}
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

Field.propTypes = {
  render: PropTypes.func,
  name: PropTypes.string,
  form: PropTypes.object,
  label: PropTypes.string
};

Field.defaultProps = {
  render: () => {},
  form: {},
  fullWidth: true,
  margin: 'normal'
};

export default Field;
