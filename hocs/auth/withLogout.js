import React from 'react';
import { setGlobal } from 'reactn';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withApollo, graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const LOGOUT_MUTATION = gql`
  mutation {
    logoutUser
  }
`;

export default function withLogout(ComposedComponent) {
  const LogoutMutation = withApollo(
    withRouter(function(props) {
      const { client, mutate } = props;

      const executeLogout = async () => {
        await mutate();

        setGlobal({
          search: {}
        });

        client.resetStore();
      };

      return <ComposedComponent {...props} logout={executeLogout} />;
    })
  );

  LogoutMutation.propTypes = {
    client: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  return graphql(LOGOUT_MUTATION)(LogoutMutation);
}
