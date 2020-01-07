import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxField = ({ field, form, disabled, label, ...rest }) => (
  <Box display="flex" alignItems="center">
    <Checkbox
      id={field.name}
      disabled={form.isSubmitting || disabled}
      checked={field.value === true}
      {...field}
      {...rest}
    />
    <Typography children={label} />
  </Box>
);

CheckboxField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string
};

export default CheckboxField;
