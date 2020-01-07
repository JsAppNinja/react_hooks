import React from 'react';
import withUser, { GET_CURRENT_USER } from '../withUser';
import wait from 'waait';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter, Switch } from 'react-router';

const currentUserMock = {
  id: 1,
  firstName: 'Foo',
  lastName: 'Bar',
  username: 'foobar',
  email: 'foo@bar.com',
  agent: false,
  hotel: false,
  admin: false,
  hasSearchAccess: true,
  image: null
};

describe('Current user is loaded', () => {
  const mocks = [
    {
      request: {
        query: GET_CURRENT_USER
      },
      result: {
        data: {
          currentUser: currentUserMock
        },
        error: undefined,
        loading: false
      }
    }
  ];

  const TestComponent = withUser(props => (
    <p>{props.currentUser && props.currentUser.username}</p>
  ));

  // Put it back the way it was
  it('fetches the current user and stores as prop', async () => {
    const wrapper = mount(
      <MemoryRouter>
        <Switch>
          <MockedProvider mocks={mocks} addTypename={false}>
            <TestComponent />
          </MockedProvider>
        </Switch>
      </MemoryRouter>
    );

    await wait(0);
    wrapper.update();

    const component = wrapper.find({ currentUser: currentUserMock });

    expect(wrapper.html()).toBe('<p>foobar</p>');
    const props = component.props();
    expect(props.currentUser).toEqual(currentUserMock);
  });
});

describe('Current user is loading', () => {
  const mocks = [
    {
      request: {
        query: GET_CURRENT_USER
      },
      result: {
        data: {
          currentUser: null
        },
        loading: true,
        error: undefined
      }
    }
  ];

  const TestComponent = withUser(props => (
    <p>{props.currentUser && props.currentUser.username}</p>
  ));

  it('returns null', async () => {
    // silence react router warning
    const wrapper = mount(
      <MemoryRouter>
        <Switch>
          <MockedProvider mocks={mocks} addTypename={false}>
            <TestComponent />
          </MockedProvider>
        </Switch>
      </MemoryRouter>
    );
    expect(wrapper.html()).toBeNull();
  });
});

describe('Error loading current user', () => {
  const mocks = [
    {
      request: {
        query: GET_CURRENT_USER
      },
      result: {
        data: undefined,
        loading: true,
        error: { anything: 'here' }
      }
    }
  ];

  const TestComponent = withUser(props => (
    <p>{props.currentUser && props.currentUser.username}</p>
  ));

  it('returns null', async () => {
    const wrapper = mount(
      <MemoryRouter>
        <Switch>
          <MockedProvider mocks={mocks} addTypename={false}>
            <TestComponent />
          </MockedProvider>
        </Switch>
      </MemoryRouter>
    );
    expect(wrapper.html()).toBeNull();
  });
});

// This can happen when logging in while already logged in
describe('Current User is undefined', () => {
  const mocks = [
    {
      request: {
        query: GET_CURRENT_USER
      },
      result: {
        data: { currentUser: undefined },
        loading: false,
        error: undefined
      }
    }
  ];

  const TestComponent = withUser(props => <p>I dont like this case</p>);

  it('returns null', async () => {
    const wrapper = mount(
      <MemoryRouter>
        <Switch>
          <MockedProvider mocks={mocks} addTypename={false}>
            <TestComponent />
          </MockedProvider>
        </Switch>
      </MemoryRouter>
    );
    expect(wrapper.html()).toBeNull();
  });
});

describe('forceRender is true', () => {
  const mocks = [
    {
      request: {
        query: GET_CURRENT_USER
      },
      result: {
        data: {
          currentUser: currentUserMock
        },
        error: undefined,
        loading: false
      }
    }
  ];

  it('passes query props into composed component', async () => {
    const TestComponent = withUser(
      () => {
        return <p>foobar</p>;
      },
      null,
      true // forceRender
    );
    const wrapper = mount(
      <MemoryRouter>
        <Switch>
          <MockedProvider mocks={mocks} addTypename={false}>
            <TestComponent />
          </MockedProvider>
        </Switch>
      </MemoryRouter>
    );

    await wait(0);
    wrapper.update();

    const component = wrapper.find({ currentUserLoading: false });

    expect(wrapper.html()).toBe('<p>foobar</p>');
    const props = component.props();
    expect(props.currentUserLoading).toEqual(false);
    expect(props.currentUserError).toEqual(undefined);
    expect(props.currentUserData).toEqual({ currentUser: currentUserMock });
  });
});
