import React, { useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';
import { get } from 'lodash';
import Box from '@material-ui/core/Box';
import RecommendationCard from './RecommendationCard';

// @TODO: property image
export const GET_RECOMMENDATIONS = gql`
  query searchRecommendations(
    $userId: Int!
    $cityId: Int
    $dateRange: DateRangeInput!
    $numberOfAdults: Int!
    $numberOfKids: Int!
  ) {
    searchRecommendations(cityId: $cityId, userId: $userId) {
      nodes {
        id
        description
        propertyAttributes
        ranking
        property {
          id
          name
          username
          images {
            id
            publicUrl
          }
          bestRate(
            dateRange: $dateRange
            numberOfAdults: $numberOfAdults
            numberOfKids: $numberOfKids
          ) {
            id
            price
            stopSold
          }
          soldOut
          addresses {
            line1
            line2
            line3
            state
            city
            zipcode
          }
        }
      }
    }
  }
`;
const defaultImage = 'https://source.unsplash.com/random/500x400';

const RecommendationList = ({ cityId, agent, userId, ...rest }) => {
  const [search] = useGlobal('search');
  const startDate = get(
    search,
    'dates.startDate',
    moment().format('YYYY-MM-DD')
  );
  const endDate = get(
    search,
    'dates.endDate',
    moment()
      .add(1, 'day')
      .format('YYYY-MM-DD')
  );
  const adults = get(search, 'guests.adults', 0);
  const kids = get(search, 'guests.kids', 0);
  const variables = { userId };
  const hasDate = !!(
    get(search, 'dates.startDate') && get(search, 'dates.endDate')
  );

  if (cityId) {
    variables.cityId = cityId;
  }

  variables.dateRange = {
    startDate,
    endDate
  };
  variables.numberOfAdults = adults;
  variables.numberOfKids = kids;

  return (
    <Query query={GET_RECOMMENDATIONS} variables={variables}>
      {({ data }) => {
        const recommendations = get(data, 'searchRecommendations.nodes', []);
        return (
          <Box {...rest}>
            {recommendations.map(recommendation => (
              <RecommendationCard
                key={recommendation.id}
                my={1}
                hasDate={hasDate}
                agent={agent}
                image={get(
                  recommendation,
                  'property.images[0].publicUrl',
                  defaultImage
                )}
                {...recommendation}
              />
            ))}
          </Box>
        );
      }}
    </Query>
  );
};

RecommendationList.propTypes = {
  cityId: PropTypes.number,
  userId: PropTypes.number,
  agent: PropTypes.object
};

export default RecommendationList;
