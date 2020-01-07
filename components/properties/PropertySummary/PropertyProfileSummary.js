import React from 'react';
import PropTypes from 'prop-types';
import { flatten, get } from 'lodash';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { getFullAddress } from '@common/helpers/address';
import { FormSummarySection } from '@common/components/form';
import { CONNECTIVITY_METHODS } from '@constants/property-connectivity-methods';

const getConnectivityDescription = values => {
  let methodDesc = null;

  if (values.rateSource === CONNECTIVITY_METHODS.SYNXIS) {
    methodDesc = 'Synxis.';
  } else if (values.rateSource === CONNECTIVITY_METHODS.MANUAL) {
    methodDesc = 'Manually.';
  } else if (values.rateSource === CONNECTIVITY_METHODS.OTHER) {
    methodDesc = `Other Method - ${values.otherRateSource}.`;
  }

  return (
    <Box display="flex">
      <Typography variant="body2">
        You would be managing your inventory through
      </Typography>
      <Box fontWeight={700} ml={1} children={methodDesc} />
    </Box>
  );
};

const PropertyProfileSummary = ({
  values,
  includeConnectivity,
  children,
  ...rest
}) => {
  const hotelAddress = values.primaryAddress
    ? getFullAddress({
        ...values.primaryAddress,
        city:
          !!values.primaryAddress.city &&
          !!Object.keys(values.primaryAddress.city).length
            ? values.primaryAddress.city.name
            : values.primaryAddress.city
      })
    : '';

  const hotelInfo = [
    { label: 'Name', value: values.name },
    { label: 'Address', value: hotelAddress },
    { label: 'Phone Number', value: values.phone },
    { label: 'Website', value: values.website },
    { label: 'Neighborhood', value: values.neighborhood }
  ];
  const connectivityInfo = [{ value: getConnectivityDescription(values) }];
  const socialInfo = [
    {
      label: 'Instagram',
      value: get(values, 'social.instagram.handle', '')
    },
    {
      label: 'Facebook',
      value: get(values, 'social.facebook.handle', '')
    },
    {
      label: 'Linkedin',
      value: get(values, 'social.linkedin.handle', '')
    }
  ];
  const contactInfo = flatten(
    (values.bookingContacts || values.contacts).map((contact, index) => [
      { label: `Name ${index + 1}`, value: contact.name },
      { label: `Title ${index + 1}`, value: contact.title },
      { label: `Email ${index + 1}`, value: contact.email },
      { label: `Phone Number ${index + 1}`, value: contact.phone, mb: 3 }
    ])
  );

  return (
    <Box {...rest}>
      <FormSummarySection title="Hotel Information" values={hotelInfo} mb={3} />
      {includeConnectivity && values.rateSource && (
        <FormSummarySection
          title="Connectivity"
          values={connectivityInfo}
          mb={3}
        />
      )}
      <FormSummarySection
        title="Social Media Accounts"
        values={socialInfo}
        mb={3}
      />
      <FormSummarySection title="Booking Contact" values={contactInfo} />
      {children}
    </Box>
  );
};

PropertyProfileSummary.propTypes = {
  values: PropTypes.object,
  includeConnectivity: PropTypes.bool,
  children: PropTypes.node
};

PropertyProfileSummary.defaultProps = {
  includeConnectivity: false
};

export default PropertyProfileSummary;
