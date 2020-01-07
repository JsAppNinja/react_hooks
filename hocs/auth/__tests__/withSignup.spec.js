/* eslint-disable react/prop-types */
import React from 'react';
import withSignup, { SIGNUP_MUTATION } from '../withSignup';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import gql from 'graphql-tag';

const CUSTOM_SIGNUP_MUTATION = gql`
  mutation customSignupMutation(
    $email: String!
    $username: String!
    $password: String!
    $age: Int
  ) {
    customSignup(
      username: $username
      email: $email
      password: $password
      age: $age
    ) {
      id
      firstName
      lastName
      username
      email
      agent
      hotel
      admin
    }
  }
`;

const currentUserMock = {
  id: 1,
  firstName: 'Foo',
  lastName: 'Bar',
  username: 'foobar',
  email: 'foo@bar.com',
  agent: false,
  admin: false,
  hotel: false
};

const mockVars = {
  email: 'emil@foo.com',
  username: 'emil',
  password: 'Password!'
};

const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: mockVars
    },
    result: {
      data: {
        signup: currentUserMock
      }
    }
  },
  {
    request: {
      query: CUSTOM_SIGNUP_MUTATION,
      variables: {
        ...mockVars,
        age: 100
      }
    },
    result: {
      data: {
        customSignup: currentUserMock
      }
    }
  }
];

describe('@common/hocs/auth/withSignup', () => {
  const TestComponent = ({ signup }) => (
    <form onSubmit={() => signup(mockVars)}>I am tha signup form</form>
  );

  const create = (mutation, userPath) => {
    const SignupWithHOC = withSignup(TestComponent, mutation, userPath);
    return mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignupWithHOC />
      </MockedProvider>
    );
  };

  const wrapper = create();

  it('should be a function', () => {
    expect(typeof withSignup).toBe('function');
  });

  it('should render original component', () => {
    expect(wrapper.html()).toBe('<form>I am tha signup form</form>');
  });

  it('should provide signup method', () => {
    expect(typeof wrapper.find('TestComponent').prop('signup')).toBe(
      'function'
    );
  });

  describe('custom signup', () => {
    const customWrapper = create(CUSTOM_SIGNUP_MUTATION, 'customSignup.emil');

    it('should render with custom mutation', () => {
      expect(customWrapper.html()).toBe('<form>I am tha signup form</form>');
    });
  });
});
