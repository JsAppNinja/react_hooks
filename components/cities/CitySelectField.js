import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';
import { AsyncSelectField } from '@common/components/form';

export const GET_CITIES = gql`
  query allCitiesQuery($condition: CityCondition, $status: [String!]) {
    allCities(condition: $condition, status: $status) {
      nodes {
        id
        name
      }
    }
  }
`;

const CitySelectField = ({ variables, ...props }) => (
  <Query query={GET_CITIES} variables={variables}>
    {({ data, refetch }) => {
      const defaultOptions = get(data, 'allCities.nodes', []);
      const loadOptions = name =>
        refetch({
          condition: {
            name
          }
        }).then(resp => get(resp.data, 'allCities.nodes', []));

      return (
        <AsyncSelectField
          data-cy="location-select"
          isClearable
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
          getOptionLabel={city => city.name}
          getOptionValue={city => city.id}
          {...props}
        />
      );
    }}
  </Query>
);

CitySelectField.propTypes = {
  variables: PropTypes.object
};

export default CitySelectField;
