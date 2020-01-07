import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { updateSearchQuery, getSearchQuery } from '@common/helpers/history';
import { mergeWith, isArray, isObject, debounce } from 'lodash';

const SEARCH_QUERY_CHANGE_DEBOUNCE_MS = 300;

function withSearchQuery(name, defaultValues, transformResponse = t => t) {
  return function(WrappedComponent) {
    class SearchQueryWrapper extends Component {
      static displayName = `withSearchQuery(${WrappedComponent.displayName})`;
      static propTypes = {
        history: PropTypes.object
      };

      constructor(props) {
        super(props);

        const query = getSearchQuery(props.history);
        let queryData = mergeWith(
          { ...defaultValues },
          query[name],
          (objValue, srcValue) => {
            if (isArray(objValue) || isObject(objValue)) {
              return srcValue;
            }
          }
        );

        this.state = { queryData };
      }

      onChange = data => {
        const { history } = this.props;
        const nextQuery = {
          [name]: data
        };

        updateSearchQuery(history.location.pathname, nextQuery);
      };

      render() {
        const newProps = {
          searchQueryData: transformResponse(this.state.queryData),
          onSearchQueryChange: debounce(
            this.onChange,
            SEARCH_QUERY_CHANGE_DEBOUNCE_MS
          )
        };

        return <WrappedComponent {...newProps} {...this.props} />;
      }
    }

    return withRouter(SearchQueryWrapper);
  };
}

export default withSearchQuery;
