import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import withSearchQuery from '@common/hocs/withSearchQuery';
import SearchableList from './SearchableList';

SearchableListContainer.propTypes = {
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
  gqlTotalPath: PropTypes.string.isRequired,

  // search qeury props
  searchQueryData: PropTypes.object,
  onSearchQueryChange: PropTypes.func
};

function SearchableListContainer({
  presets,
  defaultPreset,
  baseVariables,
  gqlQuery,
  gqlDataPath,
  gqlTotalPath,
  searchQueryData,
  onSearchQueryChange,
  ...rest
}) {
  const [per, setPer] = useState(parseInt(searchQueryData.per, 10));
  const [page, setPage] = useState(parseInt(searchQueryData.page, 10));
  const [search, setSearch] = useState(searchQueryData.search);
  const [preset, setPreset] = useState(defaultPreset || searchQueryData.preset);

  useEffect(() => {
    onSearchQueryChange({
      per,
      page,
      search,
      preset
    });
  }, [per, page, search, preset]);

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
          <SearchableList
            presets={presets}
            rows={rows}
            totalCount={totalCount}
            per={per}
            page={page}
            search={search}
            preset={preset}
            setPer={setPer}
            setPage={setPage}
            setPreset={setPreset}
            setSearch={setSearch}
            {...rest}
          />
        );
      }}
    </Query>
  );
}

export default withSearchQuery('q', {
  page: 0,
  per: 5,
  search: '',
  preset: null
})(SearchableListContainer);
