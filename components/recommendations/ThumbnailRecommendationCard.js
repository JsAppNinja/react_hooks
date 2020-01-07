import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { formatCurrency } from '@common/helpers/currency';
import ButtonLink from '@common/components/common/ButtonLink';
import { PropertyAttributeList } from '@common/components/properties';
import { getUrlWithSearch } from '@user/components/search/SearchBarForm/helpers';
import RecommendationRanking from './RecommendationRanking';

import {
  ThumbnailImage,
  ThumbnailContent,
  AttributeList,
  ThumbnailName
} from '@common/components/common/ThumbnailCard';

const ThumbnailRecommendationCard = ({
  image,
  propertyAttributes,
  ranking,
  property,
  onClick,
  agent,
  ...rest
}) => {
  const { id, name, bestRate, soldOut } = property;
  const priceStr = bestRate ? formatCurrency(bestRate.price) : null;

  const url = getUrlWithSearch(
    agent ? `/a/${agent.username}/hotels/${id}` : `/hotels/${id}`
  );

  const disabled = !!soldOut || !priceStr;

  return (
    <Box {...rest}>
      <Card elevation={0}>
        <CardActionArea onClick={onClick}>
          <ThumbnailImage image={image} title={name} />
        </CardActionArea>
        <ThumbnailContent elevation={2}>
          <RecommendationRanking ranking={ranking} />
          <ThumbnailName onClick={onClick}>
            <Typography align="center" variant="h3">
              {name}
            </Typography>
          </ThumbnailName>
          <AttributeList>
            <Typography variant="h3">Style</Typography>
            <PropertyAttributeList value={propertyAttributes || []} />
          </AttributeList>
          <CardActions>
            <Grid container>
              <Grid item xs={6}>
                {!!priceStr && `${priceStr}/night`}
              </Grid>
              <Grid item xs={6}>
                <ButtonLink
                  data-cy={
                    disabled
                      ? 'thumbnail-book-button-disabled'
                      : 'thumbnail-book-button-enabled'
                  }
                  disabled={disabled}
                  to={url}
                >
                  {disabled ? 'Sold Out' : 'Book'}
                </ButtonLink>
              </Grid>
            </Grid>
          </CardActions>
        </ThumbnailContent>
      </Card>
    </Box>
  );
};

ThumbnailRecommendationCard.propTypes = {
  image: PropTypes.string,
  propertyAttributes: PropTypes.arrayOf(PropTypes.string),
  ranking: PropTypes.number,
  property: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  agent: PropTypes.object
};

// @TODO: Should remove this once api returns image
ThumbnailRecommendationCard.defaultProps = {
  image: 'https://source.unsplash.com/random/500x400'
};

export default ThumbnailRecommendationCard;
