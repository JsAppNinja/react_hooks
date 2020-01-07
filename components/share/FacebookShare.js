import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import { Icon } from '@common/components/common';
import { FacebookShareButton } from 'react-share';

const ShareButton = styled(FacebookShareButton)({
  cursor: 'pointer'
});

const FacebookShare = ({ link }) => {
  return (
    <ShareButton url={link}>
      <Icon svg size={40} icon={'share-facebook'} />
    </ShareButton>
  );
};

FacebookShare.propTypes = {
  link: PropTypes.string.isRequired
};

export default FacebookShare;
