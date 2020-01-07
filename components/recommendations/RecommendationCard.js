import React from 'react';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/Close';
import { ButtonLink } from '@common/components/common';
import { PropertyAttributeList } from '@common/components/properties';
import { getFullAddress } from '@common/helpers/address';
import { formatCurrency } from '@common/helpers/currency';
import { getUrlWithSearch } from '@user/components/search/SearchBarForm/helpers';
import { get } from 'lodash';
import RecommendationRanking, {
  RANKING_POSITIONS
} from './RecommendationRanking';
import {
  ThumbnailImage,
  ThumbnailContent,
  ThumbnailName
} from '@common/components/common/ThumbnailCard';
import { colors } from '@constants/style';

const CardBox = styled(Box)({
  border: `2px solid ${colors.purple}`,
  margin: '16px 0'
});

const RecommendationCard = ({
  description,
  propertyAttributes,
  ranking,
  property,
  target,
  image,
  onClose,
  agent,
  hasDate,
  ...rest
}) => {
  const { id, bestRate, soldOut, addresses = [] } = property;
  const addr = addresses.map(a => getFullAddress(a)).join('\n');
  const priceStr = bestRate ? formatCurrency(bestRate.price) : null;
  const username = get(property, 'username');

  return (
    <CardBox {...rest} position="relative">
      <Box component={Card} p={1} display="flex">
        <Box width={300} mr={2} p={2}>
          <Card elevation={0}>
            <ThumbnailImage image={image} title={property.name} />
            <ThumbnailContent elevation={2}>
              <RecommendationRanking
                ranking={ranking}
                pos={RANKING_POSITIONS.RIGHT_TOP}
              />
              <ThumbnailName
                onClick={() => {
                  const url = getUrlWithSearch(
                    agent
                      ? `/a/${agent.username}/hotels/${id}`
                      : `/hotels/${id}`
                  );
                  window.location = url.pathname;
                }}
              >
                <Typography align="center" variant="h3">
                  {property.name}
                </Typography>
                <Link align="center" variant="body1">
                  {addr}
                </Link>
              </ThumbnailName>
            </ThumbnailContent>
          </Card>
        </Box>
        <Box flex={1} mr={2}>
          <CardContent>
            <Typography variant="h3">About @{username}</Typography>
            <Typography variant="body1">{description}</Typography>
            <Box my={2}>
              <Typography variant="h3">Style</Typography>
              <PropertyAttributeList value={propertyAttributes || []} />
            </Box>
            {hasDate && (
              <Box
                mt={1}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Typography variant="h2">
                  {soldOut || !priceStr ? 'SOLD OUT' : priceStr}
                </Typography>
                /Night&nbsp;&nbsp;
                {(agent || (!soldOut && priceStr)) && (
                  <ButtonLink
                    to={getUrlWithSearch(
                      agent
                        ? `/a/${agent.username}/hotels/${id}`
                        : `/hotels/${id}`
                    )}
                    disabled={soldOut || !priceStr}
                    children="Book A Room"
                  />
                )}
              </Box>
            )}
          </CardContent>
        </Box>
      </Box>
      {onClose && (
        <Box
          component={Link}
          position="absolute"
          top={15}
          right={15}
          onClick={onClose}
          fontSize={2}
        >
          <CloseIcon />
        </Box>
      )}
    </CardBox>
  );
};

RecommendationCard.propTypes = {
  description: PropTypes.string,
  hasDate: PropTypes.bool,
  propertyAttributes: PropTypes.arrayOf(PropTypes.string),
  agent: PropTypes.Object,
  ranking: PropTypes.number,
  property: PropTypes.object,
  target: PropTypes.string,
  image: PropTypes.string,
  onClose: PropTypes.func
};

RecommendationCard.defaultProps = {
  target: '_self'
};

export default RecommendationCard;
