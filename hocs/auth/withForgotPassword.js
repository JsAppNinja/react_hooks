import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation($email: String!) {
    forgotPassword(email: $email)
  }
`;

export default function withForgotPassword(
  ComposedComponent,
  mutation = FORGOT_PASSWORD_MUTATION
) {
  const ForgotPasswordMutation = function(props) {
    const { mutate } = props;

    const executeForgotPassword = async values => {
      await mutate({ variables: values });
    };

    return (
      <ComposedComponent {...props} forgotPassword={executeForgotPassword} />
    );
  };

  ForgotPasswordMutation.propTypes = {
    mutate: PropTypes.func.isRequired
  };

  return graphql(mutation)(ForgotPasswordMutation);
}
