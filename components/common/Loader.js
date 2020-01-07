import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = props => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    width={1}
    height={300}
    {...props}
  >
    <CircularProgress />
  </Box>
);

export default Loader;
