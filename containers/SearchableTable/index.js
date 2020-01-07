import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import SearchableTable from './SearchableTable';

SearchableTableContainer.propTypes = {
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      variables: PropTypes.object
    })
  ),
  defaultPreset: PropTypes.string,

  // apollo gql props
  baseVariables: PropTypes.object.isRequired,
  gqlQuery: PropTypes.object.isRequired,
  gqlDataPath: PropTypes.string.isRequired,
  gqlTotalPath: PropTypes.string.isRequired
};

function SearchableTableContainer({
  presets,
  defaultPreset,
  baseVariables,
  gqlQuery,
  gqlDataPath,
  gqlTotalPath,
  ...rest
}) {
  const [per, setPer] = useState(5);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [preset, setPreset] = useState(defaultPreset);

  useEffect(() => {
    setPage(0);
  }, [per, search, preset]);

  const presetVars = get(
    presets.find(p => p.value === preset),
    'variables',
    {}
  );

  const variables = {
    ...baseVariables,
    ...presetVars,
    query: search,
    per,
    page: page + 1
  };

  return (
    <Query query={gqlQuery} variables={variables}>
      {({ data }) => {
        const rows = get(data, gqlDataPath, []);
        const totalCount = get(data, gqlTotalPath, rows.length);

        return (
          <SearchableTable
            rows={rows}
            totalCount={totalCount}
            per={per}
            page={page}
            search={search}
            presets={presets}
            preset={preset}
            setPer={setPer}
            setPage={setPage}
            setSearch={setSearch}
            setPreset={setPreset}
            {...rest}
          />
        );
      }}
    </Query>
  );
}

export default SearchableTableContainer;
