import React from 'react';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RoomTypeRate from './RoomTypeRate';
import defaultImage from '@common/components/photos/grey.jpg';
import get from 'lodash/get';

import { colors } from '@constants/style';

import {
  ThumbnailImage,
  ThumbnailContent
} from '@common/components/common/ThumbnailCard';

RoomCard.propTypes = {
  id: PropTypes.number,
  propertyId: PropTypes.number,
  name: PropTypes.string,
  hasDate: PropTypes.bool,
  description: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  username: PropTypes.string, // agent username
  rates: PropTypes.arrayOf(
    PropTypes.shape({
      stopSold: PropTypes.Boolean,
      price: PropTypes.string,
      rateSource: PropTypes.string
    })
  ),
  bestRate: PropTypes.shape({
    stopSold: PropTypes.Boolean,
    price: PropTypes.string,
    rateSource: PropTypes.string
  })
};

const CardContainer = styled(Card)({
  border: `2px solid ${colors.purple}`,
  padding: '16px'
});

function RoomCard({
  name,
  description,
  rates, // eslint-disable-line
  bestRate,
  image,
  propertyId,
  id,
  hasDate,
  username,
  ...rest
}) {
  const descriptions = description || [];
  const imgUrl = get(image, 'publicUrl', defaultImage);
  return (
    <CardContainer {...rest}>
      <Grid container>
        <Grid item md={4}>
          <Card elevation={0}>
            <ThumbnailImage image={imgUrl} title={name} />
            <ThumbnailContent align="center" elevation={2}>
              <Typography variant="h3">{name}</Typography>
            </ThumbnailContent>
          </Card>
        </Grid>
        <Grid item md={8}>
          <Box
            display="flex"
            height="100%"
            flexDirection="column"
            justifyContent="space-between"
          >
            <CardContent>
              <Typography variant="h3" gutterBottom>
                About
              </Typography>
              {descriptions.map((text, i) => (
                <Typography key={i} variant="body1">
                  {text}
                </Typography>
              ))}
            </CardContent>
            <RoomTypeRate
              hasDate={hasDate}
              bestRate={bestRate}
              propertyId={propertyId}
              roomTypeId={id}
              username={username}
            />
          </Box>
        </Grid>
      </Grid>
    </CardContainer>
  );
}

export default RoomCard;
