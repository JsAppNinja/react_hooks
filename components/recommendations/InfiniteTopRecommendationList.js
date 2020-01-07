import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { InfiniteList } from '@common/components/common';
import TopRecommendationCard from './TopRecommendationCard';

const gqlRootPath = 'topRecommendedProperties';
const gqlDataPath = 'topRecommendedProperties.nodes';
const gqlPageInfoPath = 'topRecommendedProperties.pageInfo';
const gqlHasNextPageInfoPath = 'topRecommendedProperties.pageInfo.hasNextPage';
const gqlCurrentPageInfoPath = 'topRecommendedProperties.pageInfo.currentPage';
const gqlRefetchingStatus = 4;
const page = 1;
const per = 5;

export const GET_TOP_RECOMMENDATIONS = gql`
  query topRecommendedProperties(
    $cityId: Int!
    $page: Int
    $per: Int
    $dateRange: DateRangeInput!
    $numberOfAdults: Int!
    $numberOfKids: Int!
  ) {
    topRecommendedProperties(cityId: $cityId, page: $page, per: $per) {
      nodes {
        id
        name
        bestRate(
          dateRange: $dateRange
          numberOfAdults: $numberOfAdults
          numberOfKids: $numberOfKids
        ) {
          id
          price
          tax
          fee
        }
      }
      pageInfo {
        hasNextPage
        currentPage
      }
    }
  }
`;

export const updateTopRecommendationListQuery = (
  previousResult,
  { fetchMoreResult }
) => {
  const prevList = get(previousResult, gqlDataPath, []);
  const nextList = get(fetchMoreResult, gqlDataPath, []);
  const nextPageInfo = get(fetchMoreResult, gqlPageInfoPath, {});

  return {
    ...previousResult,
    [gqlRootPath]: {
      ...previousResult[gqlRootPath],
      nodes: [...prevList, ...nextList],
      pageInfo: nextPageInfo
    }
  };
};

const InfiniteTopRecommendationList = ({
  scrollEnabled,
  cityId,
  startDate,
  endDate,
  setHasNextPage,
  numberOfAdults,
  numberOfKids,
  ...rest
}) => {
  const variables = {
    cityId,
    dateRange: { startDate, endDate },
    per,
    page,
    numberOfAdults,
    numberOfKids
  };

  return (
    <Query
      query={GET_TOP_RECOMMENDATIONS}
      variables={variables}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, refetch, fetchMore, networkStatus }) => {
        if (networkStatus === gqlRefetchingStatus) {
          return null;
        }

        const hasNextPage = get(data, gqlHasNextPageInfoPath, false);
        const result = get(data, gqlDataPath, []);
        const currentPage = get(data, gqlCurrentPageInfoPath);
        const resetList = () => refetch(variables);
        const loadNextPage = () =>
          fetchMore({
            variables: { ...variables, page: currentPage + 1, per },
            updateQuery: updateTopRecommendationListQuery
          });

        setHasNextPage(hasNextPage);

        return (
          <InfiniteList
            {...rest}
            scrollEnabled={scrollEnabled}
            isFixedHeight={false}
            items={result}
            renderRow={({ item: { id, name, bestRate }, index }) => (
              <Box key={id}>
                <TopRecommendationCard
                  id={id}
                  name={name}
                  bestRate={bestRate}
                  ranking={index + 1}
                  py={1}
                />
              </Box>
            )}
            hasNextPage={hasNextPage}
            resetList={resetList}
            loadNextPage={loadNextPage}
            isNextPageLoading={loading}
          />
        );
      }}
    </Query>
  );
};

InfiniteTopRecommendationList.propTypes = {
  scrollEnabled: PropTypes.bool.isRequired,
  cityId: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  numberOfAdults: PropTypes.number.isRequired,
  numberOfKids: PropTypes.number.isRequired,
  setHasNextPage: PropTypes.func.isRequired
};

export default InfiniteTopRecommendationList;
