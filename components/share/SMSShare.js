import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@common/components/common';
import ButtonBase from '@material-ui/core/ButtonBase';
import { isMobile } from '@common/helpers/detect';

// Renders a button which when clicked shows the modal.
const SMSShare = ({ link }) => {
  let shareSMS = () => {};

  try {
    shareSMS = () => {
      window.open(`sms:&body=${link}`, '_self');
    };
  } catch (e) {
    console.log(e);
  }

  return (
    <>
      {isMobile() && (
        <ButtonBase onClick={shareSMS}>
          <Icon svg size={40} icon={'share-text'} />
        </ButtonBase>
      )}
    </>
  );
};

SMSShare.propTypes = {
  link: PropTypes.string.isRequired
};

export default SMSShare;
