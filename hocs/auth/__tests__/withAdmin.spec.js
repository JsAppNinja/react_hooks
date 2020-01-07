import React from 'react';
import withAdmin, { GET_CURRENT_USER } from '../withAdmin';
import wait from 'waait';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter, Switch } from 'react-router';

const userMock = {
  id: 1,
  firstName: 'Foo',
  lastName: 'Bar',
  username: 'foobar',
  email: 'foo@bar.com',
  agent: false,
  hotel: false,
  image: null,
  admin: false,
  hasSearchAccess: true
};

const adminMock = {
  id: 2,
  firstName: 'Admin',
  lastName: 'User',
  username: 'adminuser',
  email: 'admin@foo.com',
  admin: true,
  agent: false,
  hotel: false,
  image: null,
  hasSearchAccess: true
};

const mockRequestWithUser = user => ({
  request: {
    query: GET_CURRENT_USER
  },
  result: {
    data: {
      currentUser: user
    }
  }
});

const TestComponent = withAdmin(props => (
  <p>{props.currentAdmin && props.currentAdmin.username}</p>
));

const createWrapper = mocks =>
  mount(
    <MemoryRouter>
      <Switch>
        <MockedProvider mocks={mocks} addTypename={false}>
          <TestComponent />
        </MockedProvider>
      </Switch>
    </MemoryRouter>
  );

describe('withAdmin() hoc', () => {
  describe('when user is not an admin', () => {
    it('returns with null currentAdmin prop', async () => {
      const wrapper = createWrapper([mockRequestWithUser(userMock)]);

      await wait(0);
      wrapper.update();

      expect(wrapper.html()).toBe('<p></p>');
      expect(wrapper.find({ currentAdmin: null }).prop('currentAdmin')).toEqual(
        null
      );
    });
  });

  describe('when user is an admin', () => {
    it('populates the currentAdmin prop', async () => {
      const wrapper = createWrapper([mockRequestWithUser(adminMock)]);

      await wait(0);
      wrapper.update();

      expect(wrapper.html()).toBe('<p>adminuser</p>');
      expect(
        wrapper.find({ currentAdmin: adminMock }).prop('currentAdmin')
      ).toEqual(adminMock);
    });
  });
});
