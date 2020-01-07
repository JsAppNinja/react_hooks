import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { FormSummarySection } from '@common/components/form';

const PropertyDescSummary = ({ values, children, ...rest }) => {
  const amenities = Array.isArray(values.amenities)
    ? values.amenities
    : values.amenities.split('\n');

  return (
    <Box {...rest}>
      <FormSummarySection title="Hotel Description" mb={3}>
        <Typography>{values.description}</Typography>
      </FormSummarySection>
      <FormSummarySection title="Amenities" mb={3}>
        <Typography>{amenities.join(', ')}</Typography>
      </FormSummarySection>
      <FormSummarySection title="Additional Notes" mb={3}>
        <Box component="ul" css={{ listStyleType: 'disc' }}>
          {values.notes &&
            values.notes.map((note, index) => (
              <Typography component="li" key={`note_${index}`}>
                {note}
              </Typography>
            ))}
        </Box>
      </FormSummarySection>
      <FormSummarySection title="Photos" mb={3}>
        <Typography>
          Please send your photos to hotels@benny.com...Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        </Typography>
      </FormSummarySection>
      {children}
    </Box>
  );
};

PropertyDescSummary.propTypes = {
  values: PropTypes.object,
  children: PropTypes.node
};

export default PropertyDescSummary;
