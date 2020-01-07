import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getIn } from 'formik';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

CustomSelectField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  renderItem: PropTypes.func,
  label: PropTypes.string,
  maxSelect: PropTypes.number,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  )
};

const CustomInputLabel = styled(InputLabel)`
  position: relative;
  top: inherit;
  left: inherit;
  transform: none;
  font-size: 0.8em;
`;

/**
 * This component is intended to use for Select field with multiple options and custom rendering.
 * CheckboxGroup or RadioGroup are good examples to use this component as base.
 */
export default function CustomSelectField(props) {
  const {
    field: { value, name, ...restField },
    form,
    label,
    options,
    renderItem,
    maxSelect,
    disabled,
    ...rest
  } = props;

  const { touched, errors } = form;
  const error = getIn(errors, name);
  const hasError = !!(getIn(touched, name) && error);

  const handleChange = itemValue => {
    if (disabled) {
      return;
    }

    const currentValue = value || [];
    if (currentValue.includes(itemValue)) {
      form.setFieldValue(name, currentValue.filter(v => v !== itemValue));
    } else if (!maxSelect || currentValue.length < maxSelect) {
      form.setFieldValue(name, [...currentValue, itemValue]);
    }
    form.setFieldTouched(name);
  };

  return (
    <Box mt={2}>
      <FormControl error={hasError} {...rest}>
        {label && <CustomInputLabel htmlFor={name}>{label}</CustomInputLabel>}
        <Box display="flex" flexWrap="wrap" mt={1}>
          {options.map(option =>
            renderItem({
              ...restField,
              ...rest,
              key: option.value,
              option,
              onChange: () => handleChange(option.value),
              checked: (value || []).includes(option.value)
            })
          )}
        </Box>
        {hasError && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
}
