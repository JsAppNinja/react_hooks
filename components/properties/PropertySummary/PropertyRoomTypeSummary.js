import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { omit } from 'lodash';
import { FormSummarySection } from '@common/components/form';

const PropertyRoomTypeSummary = ({ values, children, ...rest }) => {
  const connectivityInfo = (values.roomTypes || []).map(roomType => ({
    label: roomType.name,
    value: (roomType.description || []).join('')
  }));

  const restProps = omit(rest, ['propertyId']);

  return (
    <Box {...restProps}>
      <FormSummarySection title="Room Types" values={connectivityInfo} mb={3} />
      {children}
    </Box>
  );
};

PropertyRoomTypeSummary.propTypes = {
  values: PropTypes.object,
  children: PropTypes.node
};

export default PropertyRoomTypeSummary;
