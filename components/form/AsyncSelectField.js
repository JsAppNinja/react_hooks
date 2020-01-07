import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import { MuiReactAsyncSelect } from '@common/components/common';

AsyncSelectField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  label: PropTypes.string,
  maxMenuOpenSelectCount: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  loadOptions: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  isMulti: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  )
};

AsyncSelectField.defaultProps = {
  isMulti: false
};

export default function AsyncSelectField(props) {
  const {
    field,
    form,
    label,
    loadOptions,
    maxMenuOpenSelectCount,
    onFocus,
    onBlur,
    disabled,
    isMulti,
    ...rest
  } = props;
  const { name, value } = field;
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const selectField = createRef();
  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);

  const handleBlur = e => {
    form.setFieldTouched(name);
    setMenuIsOpen(false);

    if (typeof onBlur === 'function') {
      onBlur(e);
    }
  };

  const handleFocus = e => {
    setMenuIsOpen(true);

    if (typeof onFocus === 'function') {
      onFocus(e);
    }
  };

  const handleChange = v => {
    if (isMulti) {
      const numItems = v.length;

      if (numItems === maxMenuOpenSelectCount) {
        setMenuIsOpen(false);
        selectField.current.blur();
      }

      if (maxMenuOpenSelectCount && numItems > maxMenuOpenSelectCount) {
        setMenuIsOpen(false);
        form.setFieldError(
          name,
          `You can select up to ${maxMenuOpenSelectCount} items only.`
        );
        return;
      }
    }

    form.setFieldValue(name, v);
  };

  return (
    <MuiReactAsyncSelect
      ref={selectField}
      loadOptions={loadOptions}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      value={value}
      isMulti={isMulti}
      openMenuOnClick
      closeMenuOnSelect={!isMulti}
      menuIsOpen={isMulti && maxMenuOpenSelectCount ? menuIsOpen : undefined}
      TextFieldProps={{
        label,
        InputLabelProps: {
          shrink: true
        },
        error: !!(touched && error),
        helperText: (touched && error) || props.helperText
      }}
      isDisabled={form.isSubmitting || disabled}
      {...rest}
    />
  );
}
