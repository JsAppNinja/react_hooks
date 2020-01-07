import React, { useState } from 'react';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { Divider } from '@common/components/common';

const ColumnHeader = styled(Typography)({
  textTransform: 'uppercase'
});

const EditButton = styled(IconButton)({
  position: 'absolute',
  right: '0',
  top: '6px'
});

const EditableColumn = ({ editable, renderContent, title, ...props }) => {
  const [editing, setEditing] = useState(false);

  return (
    <Box position="relative" {...props}>
      <Box
        px={2}
        pt={2}
        pb={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <ColumnHeader variant="h3">{title}</ColumnHeader>
        {editable && (
          <EditButton size="small" onClick={() => setEditing(!editing)}>
            {editing ? <CancelIcon /> : <EditIcon />}
          </EditButton>
        )}
      </Box>
      <Divider />
      <Box flex={1}>{renderContent({ editing, setEditing })}</Box>
    </Box>
  );
};

EditableColumn.propTypes = {
  title: PropTypes.string,
  editable: PropTypes.bool,
  renderContent: PropTypes.func
};

export default EditableColumn;
