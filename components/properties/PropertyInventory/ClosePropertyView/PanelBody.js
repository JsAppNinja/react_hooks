import React from 'react';
import PropTypes from 'prop-types';
import { reduce } from 'lodash';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { CheckboxField } from '@common/components/form';
import { Button, MenuLink } from '@common/components/common';

const PanelBody = ({ rates, onPrevClick, onNextClick, onCloseProperty }) => {
  const initialValues = reduce(
    rates,
    (acc, rate) => {
      acc[rate.date.fullDate] = Boolean(rate.stopSold);
      return acc;
    },
    {}
  );
  const renderForm = (
    { resetForm, isSubmitting } // eslint-disable-line
  ) => (
    <Form>
      <Box display="flex" alignItems="stretch">
        <Box width={60} display="flex" flexDirection="column">
          <Box
            height={60}
            bgcolor="#4a4a4a"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton onClick={onPrevClick}>
              <ChevronLeftIcon css={{ color: 'white' }} />
            </IconButton>
          </Box>
          <Box height={60} />
        </Box>
        {rates.map((item, index) => (
          <Box
            key={`rate_${index}`}
            flex={1}
            display="flex"
            flexDirection="column"
          >
            <Box
              height={60}
              bgcolor="#4a4a4a"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              color="white"
            >
              <Typography
                variant="body1"
                children={item.date.dayOfWeek}
                css={{ textTransform: 'uppercase' }}
              />
              <Typography variant="body2" children={item.date.date} />
            </Box>
            <Box
              height={60}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Field component={CheckboxField} name={item.date.fullDate} />
            </Box>
          </Box>
        ))}
        <Box width={60} display="flex" flexDirection="column">
          <Box
            height={60}
            bgcolor="#4a4a4a"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton onClick={onNextClick}>
              <ChevronRightIcon css={{ color: 'white' }} />
            </IconButton>
          </Box>
          <Box height={60} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
        <MenuLink onClick={resetForm} children="Clear All" />
        <Button type="submit" children="Save" ml={2} loading={isSubmitting} />
      </Box>
    </Form>
  );
  const handleSubmit = (values, actions) => {
    const payload = {
      dates: Object.keys(values).filter(fullDate => !!values[fullDate]),
      stopSold: true
    };
    onCloseProperty(payload, actions);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={renderForm}
      enableReinitialize
    />
  );
};

PanelBody.propTypes = {
  rates: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onCloseProperty: PropTypes.func.isRequired
};

export default PanelBody;
