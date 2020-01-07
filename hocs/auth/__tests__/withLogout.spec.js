/* eslint-disable react/prop-types */
import React from 'react';
import withLogout, { LOGOUT_MUTATION } from '../withLogout';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

const mocks = [
  {
    request: {
      query: LOGOUT_MUTATION
    },
    result: {
      data: {
        logoutUser: {}
      }
    }
  }
];

describe('@common/hocs/auth/withLogout', () => {
  const TestComponent = ({ logout }) => (
    <button onClick={() => logout()}>logout</button>
  );

  const create = () => {
    const LogoutWithHOC = withLogout(TestComponent);
    return mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <LogoutWithHOC />
        </MemoryRouter>
      </MockedProvider>
    );
  };

  const wrapper = create();

  it('should be a function', () => {
    expect(typeof withLogout).toBe('function');
  });

  it('should render original component', () => {
    expect(wrapper.html()).toBe('<button>logout</button>');
  });

  it('should provide login method', () => {
    expect(typeof wrapper.find('TestComponent').prop('logout')).toBe(
      'function'
    );
  });
});
