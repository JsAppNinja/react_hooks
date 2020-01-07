import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@common/components/common';

const now = moment().startOf('day');

const InventoryAdjustField = ({
  form,
  field: { name, value },
  monthStartDate,
  ...rest
}) => {
  const error = getIn(form.errors, name);
  const touched = getIn(form.touched, name);
  const setValue = val => {
    form.setFieldTouched(name);
    form.setFieldValue(name, val);
  };

  useEffect(() => {
    form.setFieldTouched('dates');

    if (monthStartDate.isSameOrBefore(now)) {
      form.setFieldValue('dates', {
        startDate: now.format('YYYY-MM-DD'),
        endDate: now
          .clone()
          .endOf('month')
          .format('YYYY-MM-DD')
      });
    } else {
      form.setFieldValue('dates', {
        startDate: monthStartDate.format('YYYY-MM-DD'),
        endDate: monthStartDate
          .clone()
          .endOf('month')
          .format('YYYY-MM-DD')
      });
    }
  }, [monthStartDate]);

  return (
    <Box {...rest}>
      <Typography variant="caption" children="Adjust inventory" gutterBottom />
      <Box display="flex" alignItems="center">
        <IconButton icon="remove_square" onClick={() => setValue(value - 1)} />
        <Box
          width={40}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="body1"
            children={value > 0 ? `+${value}` : value}
          />
        </Box>
        <IconButton icon="add_square" onClick={() => setValue(value + 1)} />
      </Box>
      <Box>{!!(touched && error) && error}</Box>
    </Box>
  );
};

InventoryAdjustField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  monthStartDate: PropTypes.object.isRequired
};

export default InventoryAdjustField;
