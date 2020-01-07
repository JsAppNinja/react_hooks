import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';
import { AsyncSelectField } from '@common/components/form';

export const GET_PROPERTIES = gql`
  query allPropertiesQuery($condition: PropertyCondition) {
    allProperties(condition: $condition) {
      nodes {
        id
        name
      }
    }
  }
`;

const PropertySelectField = ({ cityId, ...rest }) => {
  const condition = cityId ? { cityId } : {};

  return (
    <Query query={GET_PROPERTIES} variables={{ condition }}>
      {({ data, refetch }) => {
        const defaultOptions = get(data, 'allProperties.nodes', []);
        const loadOptions = name =>
          refetch({
            condition: { ...condition, name }
          }).then(resp => get(resp.data, 'allProperties.nodes', []));

        return (
          <AsyncSelectField
            isClearable
            defaultOptions={defaultOptions}
            loadOptions={loadOptions}
            getOptionLabel={property => property.name}
            getOptionValue={property => property.id}
            {...rest}
          />
        );
      }}
    </Query>
  );
};

PropertySelectField.propTypes = {
  cityId: PropTypes.number,
  field: PropTypes.object.isRequired
};

PropertySelectField.defaultProps = {
  cityId: null
};

export default PropertySelectField;
