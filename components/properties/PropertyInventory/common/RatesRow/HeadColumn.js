import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const HeadColumn = ({ withDatesHeader }) => (
  <Box width={150} display="flex" flexDirection="column">
    {withDatesHeader && <Box height={60} bgcolor="#4a4a4a" />}
    <Box borderRight={1} borderColor="lightGrey">
      <Box
        height={60}
        display="flex"
        alignItems="center"
        p={2}
        borderBottom={1}
        borderColor="lightGrey"
        fontWeight={600}
        children="Inventory"
      />
      <Box
        height={60}
        display="flex"
        alignItems="center"
        p={2}
        children="Rate"
      />
    </Box>
  </Box>
);

HeadColumn.propTypes = {
  withDatesHeader: PropTypes.bool
};

export default HeadColumn;
