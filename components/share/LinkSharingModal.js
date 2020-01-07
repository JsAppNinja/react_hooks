import React, { useState } from 'react';
import { Modal, Button } from '@common/components/common';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { withSnackbar } from 'notistack';
import { Typography } from '@material-ui/core';
import {
  FacebookShare,
  TwitterShare,
  LinkedInShare,
  SMSShare,
  LinkShare
} from '@common/components/share';

// Renders a button which when clicked shows the modal.
const LinkSharingModal = ({ title, link, buttonText, enqueueSnackbar }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{buttonText}</Button>
      <Modal maxWidth="md" open={isOpen} handleClose={() => setOpen(false)}>
        <Box m={4}>
          <Typography align="center" variant="h2">
            {title}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-evenly">
          <FacebookShare link={link} />
          <TwitterShare link={link} />
          <LinkedInShare link={link} />
          <SMSShare link={link} />
          <LinkShare link={link} enqueueSnackbar={enqueueSnackbar} />
        </Box>
      </Modal>
    </>
  );
};

LinkSharingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  title: PropTypes.string,
  linkType: PropTypes.oneOf(['agent', 'hotel']),
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(LinkSharingModal);
