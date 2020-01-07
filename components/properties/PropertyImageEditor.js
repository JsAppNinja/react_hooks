import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import gql from 'graphql-tag';
import { PhotoUpload } from '@common/components/photos';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Button } from '@common/components/common';
import CircularProgress from '@material-ui/core/CircularProgress';

const PROPERTY_PHOTOS = gql`
  query propertyImages($id: Int!) {
    property(id: $id) {
      id
      images {
        id
        publicUrl
      }
    }
  }
`;

const DELETE_IMAGE = gql`
  mutation deleteImage($id: Int!) {
    deleteFile(id: $id)
  }
`;

const SlideRow = ({ img, idx, refetch }) => {
  const [deleteImage] = useMutation(DELETE_IMAGE, {
    variables: {
      id: img.id
    }
  });

  const deleteAndRefetch = () => {
    deleteImage();
    refetch();
  };

  return (
    <Grid xs={12} container>
      <Grid xs={2} container alignItems="center">
        slide {idx + 1}
      </Grid>
      <Grid xs={4} container justify="center">
        <img key={img.id} height="50" src={img.publicUrl} />{' '}
      </Grid>
      <Grid xs={6}>
        <Button onClick={deleteAndRefetch}>remove</Button>
      </Grid>
    </Grid>
  );
};

SlideRow.propTypes = {
  img: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  refetch: PropTypes.func.isRequired
};
const PropertyImageEditor = property => {
  const { data, error, loading, refetch } = useQuery(PROPERTY_PHOTOS, {
    variables: {
      id: property.propertyId
    }
  });

  if (error) {
    return 'There was an error, please try again';
  }
  const reloadImages = () => {
    refetch();
  };

  if (loading) {
    return null;
  }

  return (
    <Grid container spacing={2} mb={2}>
      <Grid container item sm={12} md={6} justify="center" alignItems="center">
        <PhotoUpload
          ownerId={property.propertyId}
          ownerType={'Property'}
          onNewPhoto={reloadImages}
          updateQueries={['propertyImages']}
          imgProps={{ height: 100, width: 100, alt: 'Profile Picture' }}
          multiple
        />
      </Grid>
      <Grid container item sm={12} md={6} justify="center" alignItems="center">
        {data.property.images.map((im, idx) => {
          return <SlideRow img={im} key={im.id} idx={idx} refetch={refetch} />;
        })}
      </Grid>
    </Grid>
  );
};

PropertyImageEditor.propTypes = {
  property: PropTypes.object
};

export default PropertyImageEditor;
