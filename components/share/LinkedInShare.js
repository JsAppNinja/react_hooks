import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import { Icon } from '@common/components/common';
import { LinkedinShareButton } from 'react-share';

const ShareButton = styled(LinkedinShareButton)({
  cursor: 'pointer'
});

const LinkedInShare = ({ link }) => {
  return (
    <ShareButton url={link}>
      <Icon svg size={40} icon={'share-linkedin'} />
    </ShareButton>
  );
};

LinkedInShare.propTypes = {
  link: PropTypes.string.isRequired
};

export default LinkedInShare;
