import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@common/components/common';
import { apiUrl, appUrl } from '@common/helpers/url';
import { capitalize } from 'lodash';

SocialButton.propTypes = {
  className: PropTypes.string,
  provider: PropTypes.string,
  authorization: PropTypes.object,
  location: PropTypes.object.isRequired
};

const handleOnClick = (provider, location) => () => {
  window.location.href = apiUrl(
    `/connect/${provider}?redir=${appUrl(location.pathname)}`
  );
};

export default function SocialButton(props) {
  const { provider, authorization, location, ...restProps } = props;
  const name = capitalize(provider);

  return (
    <Button
      {...restProps}
      disabled={!!authorization}
      onClick={handleOnClick(provider, location)}
    >
      <i className={`fab fa-${provider}`} />{' '}
      {authorization ? `Connected with ${name}` : `Login with ${name}`}
    </Button>
  );
}
