import React from 'react';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { SingleCarousel } from '@common/components/common';
import { getFullAddress } from '@common/helpers/address';
import Link from '@material-ui/core/Link';

import { colors } from '@constants/style';

PropertyCard.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  addresses: PropTypes.object
};

PropertyCard.defaultProps = {
  addresses: [],
  images: []
};

const CenteredGrid = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const ContainerBox = styled(Box)({
  borderBottom: `3px solid ${colors.purple}`
});

function PropertyCard({ name, username, images, addresses, ...rest }) {
  const addr = addresses.map(a => getFullAddress(a)).join('\n');

  return (
    <ContainerBox component={Paper} display="flex" {...rest}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <SingleCarousel images={images} height={400} />
        </Grid>
        <CenteredGrid item xs={12} sm={8}>
          <Box align="center" p={3}>
            <Typography variant="h1" gutterBottom>
              {name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              @{username}
            </Typography>
            <Link href={`https://maps.google.com/?q=${addr}`} target="_blank">
              <Typography variant="subtitle1" gutterBottom>
                {addr}
              </Typography>
            </Link>
          </Box>
        </CenteredGrid>
      </Grid>
    </ContainerBox>
  );
}

export default PropertyCard;
