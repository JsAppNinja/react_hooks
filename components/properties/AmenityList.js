import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

AmenityList.propTypes = {
  amenities: PropTypes.array
};

export default function AmenityList({ amenities, ...rest }) {
  return (
    <Box {...rest}>
      {amenities.map(a => (
        <Box key={a.id} display="flex" mb={2}>
          <Box component={Icon} mr={1}>
            {a.icon}
          </Box>
          <Typography>{a.name}</Typography>
        </Box>
      ))}
    </Box>
  );
}
