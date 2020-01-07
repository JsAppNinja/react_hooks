import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
  InputField,
  CheckboxField,
  DateRangeField
} from '@common/components/form';
import { Button } from '@common/components/common';
import InventoryAdjustField from './InventoryAdjustField';
import schema from './schema';

const now = moment().startOf('day');

const INITIAL_VALUES = {
  dates: {
    startDate: now.format('YYYY-MM-DD'),
    endDate: now
      .clone()
      .endOf('month')
      .format('YYYY-MM-DD')
  },
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: true,
  sunday: true,
  rate: 0,
  inventory: 0
};

const EditForm = ({ monthStartDate, onSelectedDateChange, onSubmit }) => {
  const renderForm = (
    { values, isSubmitting } // eslint-disable-line
  ) => (
    <Form>
      <Box display="flex" mb={2}>
        <DateRangeField
          name="dates"
          value={values.dates}
          labels={{ startDate: 'Start date', endDate: 'End date' }}
          onChange={onSelectedDateChange}
        />
      </Box>
      <Box mb={2}>
        <Typography
          variant="caption"
          children="Select which days of the week to apply rate"
          gutterBottom
        />
        <Box display="flex" flexWrap="wrap">
          <Box>
            <Field component={CheckboxField} name="monday" label="M" />
          </Box>
          <Box>
            <Field component={CheckboxField} name="tuesday" label="T" />
          </Box>
          <Box>
            <Field component={CheckboxField} name="wednesday" label="W" />
          </Box>
          <Box>
            <Field component={CheckboxField} name="thursday" label="TH" />
          </Box>
          <Box>
            <Field component={CheckboxField} name="friday" label="F" />
          </Box>
          <Box>
            <Field component={CheckboxField} name="saturday" label="S" />
          </Box>
          <Box>
            <Field component={CheckboxField} name="sunday" label="SU" />
          </Box>
        </Box>
      </Box>
      <Box mb={2}>
        <Field component={InputField} name="rate" label="Apply rate" />
      </Box>
      <Box mb={2}>
        <Field
          name="inventory"
          component={InventoryAdjustField}
          monthStartDate={monthStartDate}
        />
      </Box>
      <Button children="Save" type="submit" loading={isSubmitting} />
    </Form>
  );

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={onSubmit}
      validationSchema={schema}
      render={renderForm}
    />
  );
};

EditForm.propTypes = {
  monthStartDate: PropTypes.object.isRequired,
  onSelectedDateChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default EditForm;
