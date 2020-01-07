import React from 'react';
import PropTypes from 'prop-types';
import { noop, isEmpty } from 'lodash';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { FormSummary } from '@common/components/form';
import PropertyProfileSummary from './PropertyProfileSummary';
import PropertyDescSummary from './PropertyDescSummary';
import PropertyFeeSummary from './PropertyFeeSummary';

export const PROPERTY_SUMMARY_SECTIONS = {
  PROPERTY_INFO: 'propertyInfo',
  PROPERTY_DESCRIPTION: 'propertyDescription',
  PROPERTY_FEES: 'propertyFees'
};

const PropertySummary = ({
  values,
  fullMode,
  includeConnectivity,
  onEdit,
  children,
  title,
  ...rest
}) => {
  const editFunc = section => () => onEdit(section);
  const composedValues = isEmpty(values)
    ? {
        name: null,
        amenities: '',
        primaryAddress: {
          city: null
        },
        phone: null,
        website: null,
        neighborhood: null,
        rateSource: null,
        otherRateSource: null,
        social: {
          instagram: null,
          facebook: null,
          linkedin: null
        },
        bookingContacts: [],
        contacts: []
      }
    : values;

  return (
    <Box {...rest}>
      {title && (
        <Box textAlign="center" mb={3}>
          <Typography variant="h3">{title}</Typography>
        </Box>
      )}
      <FormSummary
        onEdit={editFunc(PROPERTY_SUMMARY_SECTIONS.PROPERTY_INFO)}
        mb={3}
      >
        <PropertyProfileSummary
          values={composedValues}
          includeConnectivity={includeConnectivity}
        />
      </FormSummary>
      <FormSummary
        onEdit={editFunc(PROPERTY_SUMMARY_SECTIONS.PROPERTY_DESCRIPTION)}
        mb={3}
      >
        <PropertyDescSummary values={composedValues} />
      </FormSummary>
      {fullMode && (
        <FormSummary
          onEdit={editFunc(PROPERTY_SUMMARY_SECTIONS.PROPERTY_FEES)}
          mb={3}
        >
          <PropertyFeeSummary values={composedValues} />
        </FormSummary>
      )}
      {children}
    </Box>
  );
};

PropertySummary.propTypes = {
  values: PropTypes.object,
  fullMode: PropTypes.bool,
  includeConnectivity: PropTypes.bool,
  title: PropTypes.node,
  children: PropTypes.node,
  onEdit: PropTypes.func
};

PropertySummary.defaultProps = {
  fullMode: false,
  onEdit: noop
};

export default PropertySummary;
