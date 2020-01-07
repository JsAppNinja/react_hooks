import React from 'react';
import PropTypes from 'prop-types';
import { PhotoUpload } from '@common/components/photos';
import { useQuery } from 'react-apollo-hooks';
import { get } from 'lodash';
import ImageChanger from './ImageChanger';

const ChangeablePhoto = ({
  ownerId,
  ownerType,
  photoQuery,
  photoQueryParams,
  onNewPhoto,
  dataPathToImage,
  imgProps,
  buttonText,
  shape
}) => {
  const { data, error, loading, refetch } = useQuery(
    photoQuery,
    photoQueryParams
  );

  const reloadImages = cloudinaryData => {
    refetch();
    if (onNewPhoto) {
      onNewPhoto(cloudinaryData);
    }
  };

  if (error) {
    return 'There was an error, please try again';
  }
  if (loading) {
    return 'Loading';
  }
  return (
    <>
      <ImageChanger
        src={get(data, dataPathToImage)}
        buttonText={buttonText}
        shape={shape}
        {...imgProps}
      >
        <PhotoUpload
          ownerId={ownerId}
          ownerType={ownerType}
          onNewPhoto={reloadImages}
        />
      </ImageChanger>
    </>
  );
};

ChangeablePhoto.propTypes = {
  ownerId: PropTypes.number.isRequired,
  ownerType: PropTypes.string.isRequired,
  photoQuery: PropTypes.string.isRequired,
  photoQueryParams: PropTypes.object.isRequired,
  onNewPhoto: PropTypes.func,
  dataPathToImage: PropTypes.string.isRequired,
  imgProps: PropTypes.object.isRequired,
  displayComponent: PropTypes.node.isRequired,
  buttonText: PropTypes.string,
  shape: PropTypes.oneOf(['square', 'circle'])
};

ChangeablePhoto.defaultProps = {
  imgProps: {
    width: 200,
    height: 200,
    alt: 'image'
  },
  buttonText: 'Choose Image',
  shape: 'square'
};

export default ChangeablePhoto;
