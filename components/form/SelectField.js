import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import InputField from './InputField';

SelectField.propTypes = {
  options: PropTypes.array
};

export default function SelectField(props) {
  const { options, ...rest } = props;
  return (
    <InputField select {...rest}>
      {options.map(o => (
        <MenuItem key={o.value} value={o.value}>
          {o.label}
        </MenuItem>
      ))}
    </InputField>
  );
}
