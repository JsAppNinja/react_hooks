import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

// Can also have args of
// data - the file informationi
// onRemoveClick - a fun to execute if the (not implemented)
// cancel button is clicked
const FileUploadFieldPresentation = ({ progress }) => {
  if (progress == 1) {
    return null;
  }
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexDirection="row"
      mt={1}
      width={1}
      style={{ backgroundColor: 'black' }}
      flexGrow={1}
    >
      <LinearProgress
        style={{ width: '100%' }}
        variant="determinate"
        value={Math.round(progress * 100)}
      />
    </Box>
  );
};

FileUploadFieldPresentation.propTypes = {
  data: PropTypes.array.isRequired,
  progress: PropTypes.number.isRequired,
  onRemoveClick: PropTypes.func
};

export default FileUploadFieldPresentation;
