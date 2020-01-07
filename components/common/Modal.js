import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@common/components/common';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    overflowY: 'visible'
  },
  paper: {
    overflowY: 'visible'
  }
}));

const Modal = ({
  title,
  isConfirmation,
  isClosable,
  hideActions,
  handleConfirm,
  handleClose,
  children,
  classes,
  ...rest
}) => {
  const defaultClasses = useStyles();
  const onClose = e => {
    handleClose(e);

    setTimeout(() => {
      const el = document.activeElement;

      // if a button triggered this modal then blur it after closing
      // we're in a setTimeout so that this runs after the next render
      if (el.tagName === 'BUTTON') {
        el.blur();
      }
    }, 0);
  };

  return (
    <Dialog classes={classes || defaultClasses} {...rest}>
      <Box position="relative">
        {isClosable && (
          <Box position="absolute" top={10} right={10}>
            <CloseIcon onClick={onClose} />
          </Box>
        )}
      </Box>
      {title && <DialogTitle children={title} />}
      <DialogContent dividers children={children} />
      {(isClosable || isConfirmation) && !hideActions && (
        <DialogActions>
          {isClosable && (
            <Button
              onClick={onClose}
              children={isConfirmation ? 'Cancel' : 'Close'}
            />
          )}
          {isConfirmation && (
            <Button
              onClick={handleConfirm}
              color="primary"
              children="Ok"
              data-cy="modal.confirm"
            />
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.object,
  isConfirmation: PropTypes.bool,
  isClosable: PropTypes.bool,
  hideActions: PropTypes.bool,
  handleConfirm: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

Modal.defaultProps = {
  isConfirmation: false,
  isClosable: true,
  hideActions: false
};

export default Modal;
