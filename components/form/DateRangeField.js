import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { noop } from 'lodash';
import { Field } from 'formik';
import { DatePickerField } from '@common/components/form';

DateRangeField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.object,
  labels: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string
  }),
  disablePast: PropTypes.bool,
  onChange: PropTypes.func,
  limitOneMonth: PropTypes.bool
};

DateRangeField.defaultProps = {
  disablePast: true,
  labels: { startDate: 'Check-in', endDate: 'Check-out' },
  onChange: noop,
  limitOneMonth: true
};

function DateRangeField({
  name,
  value,
  labels,
  disablePast,
  onChange,
  limitOneMonth
}) {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const oneYearLater = moment().add(1, 'year');
  const handleStartClose = newStartDate => {
    setStartOpen(false);

    if (newStartDate && !moment(newStartDate).isSame(value.startDate)) {
      setEndOpen(true);
    }
  };
  const handleEndOpen = () => {
    if (value.startDate) {
      setEndOpen(true);
    } else {
      setStartOpen(true);
    }
  };
  const handleEndClose = () => {
    setEndOpen(false);
    document.body.focus();
  };

  return (
    <>
      <Field
        name={`${name}.startDate`}
        component={DatePickerField}
        open={startOpen}
        onOpen={() => setStartOpen(true)}
        onClose={() => setStartOpen(false)}
        onAccept={handleStartClose}
        maxDate={oneYearLater}
        variant="inline"
        label={labels.startDate}
        autoOk
        disableToolbar
        disablePast={disablePast}
        onChange={val => onChange('startDate', val)}
      />
      <Field
        name={`${name}.endDate`}
        component={DatePickerField}
        open={endOpen}
        variant="inline"
        onOpen={handleEndOpen}
        onClose={handleEndClose}
        minDate={
          value.startDate ? moment(value.startDate).add(1, 'day') : undefined
        }
        maxDate={
          value.startDate && limitOneMonth
            ? moment(value.startDate).add(30, 'day')
            : undefined
        }
        label={labels.endDate}
        autoOk
        disableToolbar
        disablePast={disablePast}
        onChange={val => onChange('endDate', val)}
      />
    </>
  );
}

export default DateRangeField;
