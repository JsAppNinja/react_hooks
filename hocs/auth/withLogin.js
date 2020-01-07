import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { GET_CURRENT_USER } from './withUser';
import gql from 'graphql-tag';
import { cloneDeep } from 'lodash';

export const LOGIN_MUTATION = gql`
  mutation loginMutation($usernameOrEmail: String!, $password: String!) {
    loginUser(usernameOrEmail: $usernameOrEmail, password: $password) {
      id
      firstName
      lastName
      username
      email
      admin
      agent
      hotel
      hasSearchAccess
      agentProfile {
        id
        status
      }
      ownedProperties {
        id
        status
      }
    }
  }
`;

const withLogin = function(ComposedComponent) {
  const LoginMutation = function(props) {
    const { mutate } = props;

    const executeLogin = async values => {
      await mutate({
        variables: values,
        refetchQueries: [
          {
            query: GET_CURRENT_USER,
            variables: {}
          }
        ],
        update: (cache, { data }) => {
          const { loginUser } = cloneDeep(data);

          cache.writeQuery({
            query: GET_CURRENT_USER,
            data: { currentUser: loginUser }
          });
        }
      });
    };

    return <ComposedComponent {...props} login={executeLogin} />;
  };

  LoginMutation.propTypes = {
    mutate: PropTypes.func.isRequired
  };

  return graphql(LOGIN_MUTATION)(LoginMutation);
};

export default withLogin;
