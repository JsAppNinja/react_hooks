import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const RESET_PASSWORD_MUTATION = gql`
  mutation($password: String!, $token: String!) {
    resetPassword(password: $password, token: $token)
  }
`;

export default function withResetPassword(
  ComposedComponent,
  mutation = RESET_PASSWORD_MUTATION
) {
  const ResetPasswordMutation = function(props) {
    const { mutate } = props;

    const executeResetPassword = async values => {
      await mutate({ variables: values });
    };

    return (
      <ComposedComponent {...props} resetPassword={executeResetPassword} />
    );
  };

  ResetPasswordMutation.propTypes = {
    mutate: PropTypes.func.isRequired
  };

  return graphql(mutation)(ResetPasswordMutation);
}
