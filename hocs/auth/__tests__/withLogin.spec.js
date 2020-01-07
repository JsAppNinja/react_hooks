/* eslint-disable react/prop-types */
import React from 'react';
import withLogin, { LOGIN_MUTATION } from '../withLogin';
import { localStorage } from '@common/lib';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

const currentUserMock = {
  id: 1,
  firstName: 'Foo',
  lastName: 'Bar',
  username: 'foobar',
  email: 'foo@bar.com'
};

const mockVars = { usernameOrEmail: 'emil', password: 'Password!' };

const mocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: mockVars
    },
    result: {
      data: {
        loginUser: currentUserMock
      }
    }
  }
];

describe('@common/hocs/auth/withLogin', () => {
  const TestComponent = ({ login }) => (
    <form onSubmit={() => login(mockVars)}>I am tha login form</form>
  );

  const create = () => {
    const LoginWithHOC = withLogin(TestComponent);
    return mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginWithHOC />
      </MockedProvider>
    );
  };

  const wrapper = create();

  it('should be a function', () => {
    expect(typeof withLogin).toBe('function');
  });

  it('should render original component', () => {
    expect(wrapper.html()).toBe('<form>I am tha login form</form>');
  });

  it('should provide login method', () => {
    expect(typeof wrapper.find('TestComponent').prop('login')).toBe('function');
  });
});
