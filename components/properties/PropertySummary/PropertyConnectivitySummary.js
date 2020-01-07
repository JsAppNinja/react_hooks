import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { FormSummarySection } from '@common/components/form';
import { CONNECTIVITY_METHODS } from '@constants/property-connectivity-methods';

const getConnectivityValue = values => {
  let methodDesc = null;

  if (values.rateSource === CONNECTIVITY_METHODS.SYNXIS) {
    methodDesc = 'Synxis';
  } else if (values.rateSource === CONNECTIVITY_METHODS.MANUAL) {
    methodDesc = 'Manually';
  } else if (values.rateSource === CONNECTIVITY_METHODS.OTHER) {
    methodDesc = `Other Method - ${values.otherRateSource}.`;
  }

  return methodDesc;
};

const PropertyConnectivitySummary = ({
  values,
  children,
  isEditable,
  ...rest
}) => {
  const connectivityInfo = [
    { label: 'Platform', value: getConnectivityValue(values) }
  ];

  return (
    <Box {...rest}>
      <FormSummarySection
        title="Connectivity"
        values={connectivityInfo}
        mb={3}
      />
      {isEditable ? (
        children
      ) : (
        <Typography>
          If you need to make a change to your connectivity, please email{' '}
          <Link to="mailto:hotels@itsbenny.com">hotels@itsbenny.com</Link>
        </Typography>
      )}
    </Box>
  );
};

PropertyConnectivitySummary.propTypes = {
  values: PropTypes.object,
  isEditable: PropTypes.bool,
  children: PropTypes.node
};

export default PropertyConnectivitySummary;
