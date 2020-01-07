import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import List from '@material-ui/core/List';
import { InfiniteList } from '@common/components/common';
import { get, uniqBy } from 'lodash';
import CityListItem from './CityListItem';

const DEFAULT_FETCH_PER_CALL = 10;

export const GET_CITIES = gql`
  query allCitiesQuery($per: Int, $page: Int) {
    allCities(per: $per, page: $page) {
      nodes {
        id
        name
      }
      pageInfo {
        hasNextPage
        currentPage
      }
    }
  }
`;

export const updateCitiesQuery = (previousResult, { fetchMoreResult }) => {
  const prevCities = get(previousResult, 'allCities.nodes', []);
  const nextCities = get(fetchMoreResult, 'allCities.nodes', []);

  return {
    ...previousResult,
    allCities: {
      ...previousResult.allCities,
      pageInfo: fetchMoreResult.allCities.pageInfo,
      nodes: [...prevCities, ...nextCities]
    }
  };
};

const InfiniteCityList = ({
  perPage,
  onSelect,
  onSelectOne,
  preSelectedCities,
  selectedIds,
  maxSelect,
  ...props
}) => {
  const handleSelect = cityId => {
    if (selectedIds.includes(cityId)) {
      onSelect(selectedIds.filter(id => id !== cityId));
      onSelectOne(null);
    } else if (selectedIds.length < maxSelect) {
      onSelect([...selectedIds, cityId]);
      onSelectOne(cityId);
    }
  };

  return (
    <Query query={GET_CITIES} variables={{ per: perPage }}>
      {({ data, loading, fetchMore }) => {
        const hasNextPage = get(data, 'allCities.pageInfo.hasNextPage', false);
        const allCities = get(data, 'allCities.nodes', []);
        const currentPage = get(data, 'allCities.pageInfo.currentPage');
        const loadNextPage = () =>
          fetchMore({
            variables: { page: currentPage + 1, per: perPage },
            updateQuery: updateCitiesQuery
          });
        const cities = uniqBy([...preSelectedCities, ...allCities], 'id');

        return (
          <InfiniteList
            {...props}
            component={List}
            items={cities}
            maxHeight={500}
            css={{ overflow: 'auto' }}
            renderRow={({ item }) => (
              <CityListItem
                key={item.id}
                city={item}
                onSelect={() => handleSelect(item.id)}
                selected={selectedIds.includes(item.id)}
              />
            )}
            hasNextPage={hasNextPage}
            loadNextPage={loadNextPage}
            isNextPageLoading={loading}
          />
        );
      }}
    </Query>
  );
};

InfiniteCityList.propTypes = {
  perPage: PropTypes.number,
  onSelect: PropTypes.func,
  onSelectOne: PropTypes.func,
  preSelectedCities: PropTypes.array,
  selectedIds: PropTypes.array,
  maxSelect: PropTypes.number
};

InfiniteCityList.defaultProps = {
  perPage: DEFAULT_FETCH_PER_CALL,
  maxSelect: 1,
  onSelectOne: () => undefined,
  selectedIds: [],
  preSelectedCities: []
};

export default InfiniteCityList;
