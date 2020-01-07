import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

FormSummary.propTypes = {
  children: PropTypes.node,
  onEdit: PropTypes.func.isRequired
};

const FormSummary = ({ onEdit, children, ...rest }) => {
  return (
    <Box component={Paper} position="relative" p={3} {...rest}>
      {onEdit && (
        <Box position="absolute" top={3} right={3}>
          <IconButton onClick={onEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
      {children}
    </Box>
  );
};

export default FormSummary;
