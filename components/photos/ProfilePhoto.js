import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import defaultImage from './grey.jpg';
import { get } from 'lodash';

const USER_IMAGE = gql`
  query userImage($username: String!) {
    findUser(username: $username) {
      id
      image {
        id
        publicUrl
      }
    }
  }
`;

const BackgroundImage = styled(Box)({
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  width: '100%',
  height: '0',
  paddingBottom: '100%'
});

const ProfilePhoto = ({ username, radius, width, height, shape }) => {
  const { data, loading, error } = useQuery(USER_IMAGE, {
    variables: {
      username: username
    }
  });
  if (loading) {
    return null;
  }
  if (error) {
    console.error(error);
    return 'Error loading';
  }

  const profilePicUrl = get(data, 'findUser.image.publicUrl');
  const src = profilePicUrl || defaultImage;

  const style = { backgroundImage: `url(${src})` };

  if (shape == 'circle') {
    style.borderRadius = `${radius}px`;
  }
  return (
    <BackgroundImage
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={width}
      height={height}
      style={style}
    />
  );
};

ProfilePhoto.defaultProps = {
  width: 1,
  height: 1,
  raidus: 80,
  shape: 'square'
};

ProfilePhoto.propTypes = {
  username: PropTypes.string.isRequired,
  width: PropTypes.any,
  height: PropTypes.any,
  shape: PropTypes.string,
  radius: PropTypes.number
};

export default ProfilePhoto;
