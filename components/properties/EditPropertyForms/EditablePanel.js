import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Panel, Button } from '@common/components/common';

EditablePanel.propTypes = {
  title: PropTypes.string,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func,
  extraProps: PropTypes.object,
  Form: PropTypes.object.isRequired,
  Summary: PropTypes.object.isRequired
};

function EditablePanel({
  title,
  defaultValues,
  onSubmit,
  Form,
  Summary,
  extraProps
}) {
  const [editing, setEditing] = useState(false);
  const handleSave = (...args) => {
    return onSubmit(...args).then(() => setEditing(false));
  };

  return (
    <Panel title={title}>
      {editing ? (
        <Form
          defaultValues={defaultValues}
          submitLabel="Save"
          onSubmit={handleSave}
          onCancel={() => setEditing(false)}
          scrollToTop={false}
          {...extraProps}
        />
      ) : (
        <Summary values={defaultValues} {...extraProps} width={1}>
          <Box mt={2}>
            <Button
              type="button"
              onClick={() => setEditing(true)}
              data-cy={`${title}.edit`}
            >
              Edit
            </Button>
          </Box>
        </Summary>
      )}
    </Panel>
  );
}

export default EditablePanel;
