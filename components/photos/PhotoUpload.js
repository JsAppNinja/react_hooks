import React from 'react';
import Box from '@material-ui/core/Box';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import { withSnackbar } from 'notistack';

import FileUploadInput from './FileUploadInput';

const UPLOAD_TO_CLOUDINARY = gql`
  mutation attachCloudinaryResult(
    $ownerId: Int!
    $ownerType: String!
    $cloudinaryPath: String!
    $contentType: String!
    $fileSize: Int!
    $isCsv: Boolean
  ) {
    attachFile(
      ownerId: $ownerId
      ownerType: $ownerType
      cloudinaryPath: $cloudinaryPath
      contentType: $contentType
      fileSize: $fileSize
      isCsv: $isCsv
    ) {
      id
      publicUrl
    }
  }
`;

const PhotoUpload = ({
  enqueueSnackbar,
  onNewPhoto,
  ownerId,
  ownerType,
  isPrivate,
  ...props
}) => {
  const [attachFile] = useMutation(UPLOAD_TO_CLOUDINARY);

  const onReadyForBackendUpload = async ({ path, size }) => {
    try {
      const resp = await attachFile({
        variables: {
          ownerId: ownerId,
          ownerType: ownerType,
          cloudinaryPath: path,
          contentType: 'text/csv',
          fileSize: size,
          isCsv: false
        }
      });

      if (onNewPhoto) {
        onNewPhoto(resp);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box {...props.boxProps}>
      <FileUploadInput
        {...props}
        isPrivate={isPrivate}
        buttonText="Upload Photo"
        onError={err => {
          enqueueSnackbar('There was an error with your file upload');
          console.log(err);
        }}
        onComplete={files => {
          onReadyForBackendUpload(files);
        }}
      />
    </Box>
  );
};

PhotoUpload.defaultProps = {
  boxProps: {
    width: 250,
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  existingPhoto: '',
  isPrivate: false
};

PhotoUpload.propTypes = {
  ownerId: PropTypes.number,
  ownerType: PropTypes.string,
  boxProps: PropTypes.object,
  onComplete: PropTypes.func,
  refetchQueries: PropTypes.array,
  onError: PropTypes.func,
  enqueueSnackbar: PropTypes.func,
  onNewPhoto: PropTypes.func,
  isPrivate: PropTypes.bool
};

export default withSnackbar(PhotoUpload);
