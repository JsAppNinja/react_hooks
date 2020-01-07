import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { Formik, Field, Form } from 'formik';
import { graphql, compose } from 'react-apollo';
import { pick } from 'lodash';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { InputField } from '@common/components/form';
import { Button } from '@common/components/common';
import { GET_CURRENT_USER } from '@common/hocs/auth/withUser';
import { RESET_PASSWORD_MUTATION } from './mutations';
import cloneDeep from 'lodash/cloneDeep';
import schema from './schema';

class OnboardSignupForm extends Component {
  static propTypes = {
    defaultValues: PropTypes.object,
    enqueueSnackbar: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  handleSubmit = async (values, actions) => {
    const { onSubmit, resetPassword, enqueueSnackbar } = this.props;

    try {
      const res = await resetPassword({
        variables: pick(values, ['username', 'email', 'password']),
        refetchQueries: [
          {
            query: GET_CURRENT_USER,
            variables: {}
          }
        ],
        update: (cache, { data }) => {
          const { resetPassword: currentUser } = cloneDeep(data);
          cache.writeQuery({
            query: GET_CURRENT_USER,
            data: {
              currentUser
            }
          });
        }
      });
      actions.setSubmitting(false);
      await onSubmit(res.data.resetPassword);
    } catch (e) {
      enqueueSnackbar(e.message || 'There was problem creating account');
      actions.setSubmitting(false);
    }
  };

  renderForm = ({ isSubmitting, isValid }) => {
    return (
      <Form>
        <Box mb={3}>
          <Typography variant="h2" gutterBottom>
            Create an Account
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                component={InputField}
                name="username"
                label="Benny Handle"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={InputField}
                name="email"
                label="Email Address"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={InputField}
                type="password"
                name="password"
                label="Password"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={InputField}
                type="password"
                name="passwordConfirm"
                label="Confirm Password"
              />
            </Grid>
          </Grid>
        </Box>
        <Box my={3}>
          <Button
            type="submit"
            disabled={!isValid}
            loading={isSubmitting}
            children="Next"
          />
        </Box>
      </Form>
    );
  };

  render() {
    const { defaultValues } = this.props;
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          passwordConfirm: '',
          username: '',
          ...defaultValues
        }}
        onSubmit={this.handleSubmit}
        validationSchema={schema}
        render={this.renderForm}
      />
    );
  }
}

export default compose(
  graphql(RESET_PASSWORD_MUTATION, { name: 'resetPassword' }),
  withSnackbar
)(OnboardSignupForm);
