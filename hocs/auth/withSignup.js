import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { GET_CURRENT_USER } from './withUser';
import gql from 'graphql-tag';
import { get, cloneDeep } from 'lodash';

export const SIGNUP_MUTATION = gql`
  mutation signupMutation(
    $email: String!
    $username: String!
    $password: String!
  ) {
    signupUser(username: $username, email: $email, password: $password) {
      id
      firstName
      lastName
      username
      email
      admin
      agent
      hotel
      hasSearchAccess
    }
  }
`;

export default function withSignup(
  ComposedComponent,
  mutation = SIGNUP_MUTATION,
  userPath = 'signupUser'
) {
  const SignupMutation = function(props) {
    const { mutate } = props;

    const executeSignup = async values => {
      await mutate({
        variables: values,
        refetchQueries: [
          {
            query: GET_CURRENT_USER,
            variables: {}
          }
        ],
        update: (cache, { data }) => {
          const user = cloneDeep(get(data, userPath));

          cache.writeQuery({
            query: GET_CURRENT_USER,
            data: { currentUser: user }
          });
        }
      });
    };

    return <ComposedComponent {...props} signup={executeSignup} />;
  };

  SignupMutation.propTypes = {
    mutate: PropTypes.func.isRequired
  };

  return graphql(mutation)(SignupMutation);
}
