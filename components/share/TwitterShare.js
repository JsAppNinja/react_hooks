import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import { Icon } from '@common/components/common';
import { TwitterShareButton } from 'react-share';

const ShareButton = styled(TwitterShareButton)({
  cursor: 'pointer'
});

const TwitterShare = ({ link }) => {
  return (
    <ShareButton url={link}>
      <Icon svg size={40} icon={'share-twitter'} />
    </ShareButton>
  );
};

TwitterShare.propTypes = {
  link: PropTypes.string.isRequired
};

export default TwitterShare;
