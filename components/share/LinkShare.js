import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@common/components/common';
import ButtonBase from '@material-ui/core/ButtonBase';

// Renders a button which when clicked shows the modal.
const LinkShare = ({ link, enqueueSnackbar }) => {
  const hiddenInputRef = createRef();
  return (
    <>
      {/* A hidden textarea to use for the copy to clipboard functionality
      it needs to be inside the modal because if it is outside it cannot
      be focused */}
      <textarea
        ref={hiddenInputRef}
        style={{
          position: 'absolute',
          left: '-1000px',
          top: '-1000px'
        }}
      />
      <ButtonBase
        onClick={() => {
          const input = hiddenInputRef.current;
          input.value = link;
          input.focus();
          input.select();
          document.execCommand('copy');
          enqueueSnackbar('Link coppied to Clipboard!');
        }}
      >
        <Icon svg size={40} icon={'share-link'} />
      </ButtonBase>
    </>
  );
};

LinkShare.propTypes = {
  link: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default LinkShare;
