/* eslint-disable react/display-name */
import React from 'react';
import { mount } from 'enzyme';
import { Redirect } from 'react-router';
import withAuthGuard from '../withAuthGuard';
import { MemoryRouter, Switch } from 'react-router';

jest.mock('../withUser');
import withUser from '../withUser';

const AnyComponent = () => <div>Emil continues to be awesome</div>;

describe('@common/hocs/auth/withAuthGuard', () => {
  const create = (redirectTo, roles) => {
    const AnyComponentWithHOC = withAuthGuard(
      redirectTo,
      roles,
      () => true,
      []
    )(AnyComponent);

    return mount(
      <MemoryRouter>
        <Switch>
          <AnyComponentWithHOC />
        </Switch>
      </MemoryRouter>
    );
  };

  it('should be a function', () => {
    expect(typeof withAuthGuard).toBe('function');
  });

  it('should return a hoc', () => {
    expect(typeof withAuthGuard()).toBe('function');
  });

  describe('when user is loading', () => {
    beforeEach(() => {
      withUser.mockImplementation(ComposedComponent => () => (
        <ComposedComponent
          currentUserData={null}
          currentUserLoading={true}
          currentUserError={undefined}
        />
      ));
    });
    it('returns loading text', () => {
      const wrapper = create();
      expect(wrapper.contains(<div>Loading</div>));
    });
  });

  describe('when user has errors and finished loading', () => {
    beforeEach(() => {
      withUser.mockImplementation(ComposedComponent => () => (
        <ComposedComponent
          currentUserData={null}
          currentUserLoading={false}
          currentUserError={{ sample: 'error' }}
        />
      ));
    });
    it('returns error text', () => {
      const wrapper = create();
      expect(wrapper.contains(<div>Error loading, please try again</div>));
    });
  });

  describe('when user has errors and is re-loading', () => {
    beforeEach(() => {
      withUser.mockImplementation(ComposedComponent => () => (
        <ComposedComponent
          currentUserData={null}
          currentUserLoading={true}
          currentUserError={{ sample: 'error' }}
        />
      ));
    });
    it('returns loading text', () => {
      const wrapper = create();
      expect(wrapper.contains(<div>Loading</div>));
    });
  });
  describe('when user is logged out', () => {
    beforeEach(() => {
      withUser.mockImplementation(ComposedComponent => () => (
        <ComposedComponent
          currentUserData={{ currentUser: null }}
          currentUserLoading={false}
          currentUserError={undefined}
        />
      ));
    });
    it('returns a redirect', () => {
      const wrapper = create();
      const f = wrapper.find(Redirect);
      expect(f.length == 1);
    });
    it('returns a redirect to a given path', () => {
      const wrapper = create('/random-path');
      const f = wrapper.find(Redirect);
      expect(f.length == 1);
      expect(f.prop('to')).toBe('/random-path');
    });
  });

  describe('when user is logged in', () => {
    describe('when user is admin', () => {
      beforeEach(() => {
        withUser.mockImplementation(ComposedComponent => () => (
          <ComposedComponent
            currentUserData={{
              currentUser: {
                admin: true
              }
            }}
            currentUserLoading={false}
            currentUserError={undefined}
          />
        ));
      });
    });
    describe('when user has a role', () => {
      beforeEach(() => {
        withUser.mockImplementation(ComposedComponent => () => (
          <ComposedComponent
            currentUserData={{
              currentUser: {
                admin: true
              }
            }}
            currentUserLoading={false}
            currentUserError={undefined}
          />
        ));
      });
      it('returns given component when roles match', () => {
        const wrapper = create('/random-path', ['admin']);
        expect(wrapper.find(AnyComponent).length == 1);
      });
      it('returns a redirect when roles do not match', () => {
        const wrapper = create('/random-path', ['agent']);
        const f = wrapper.find(Redirect);
        expect(f.length == 1);
        expect(f.prop('to')).toBe('/random-path');
      });
    });
    describe('when user has multiple roles', () => {
      beforeEach(() => {
        withUser.mockImplementation(ComposedComponent => () => (
          <ComposedComponent
            currentUserData={{
              currentUser: {
                admin: true,
                agent: true
              }
            }}
            currentUserLoading={false}
            currentUserError={undefined}
          />
        ));
      });
      it('returns given component when roles match', () => {
        const wrapper = create('/random-path', ['agent']);
        expect(wrapper.find(AnyComponent).length == 1);
      });
      it('returns a redirect when roles do not match', () => {
        const wrapper = create('/random-path', ['other-role']);
        const f = wrapper.find(Redirect);
        expect(f.length == 1);
        expect(f.prop('to')).toBe('/random-path');
      });
    });
    describe('when user has is loading but is also loaded', () => {
      beforeEach(() => {
        withUser.mockImplementation(ComposedComponent => () => (
          <ComposedComponent
            currentUserData={{
              currentUser: {
                id: 1
              }
            }}
            currentUserLoading={true}
            currentUserError={undefined}
          />
        ));
      });
      it('returns loading text', () => {
        const wrapper = create();
        expect(wrapper.contains(<div>Loading</div>));
      });
    });
    describe('when user has errors & is loaded', () => {
      beforeEach(() => {
        withUser.mockImplementation(ComposedComponent => () => (
          <ComposedComponent
            currentUserData={{
              currentUser: {
                id: 1
              }
            }}
            currentUserLoading={false}
            currentUserError={{ anything: 'here' }}
          />
        ));
      });
      it('returns error text', () => {
        const wrapper = create();
        expect(wrapper.contains(<div>Error loading, please try again</div>));
      });
    });

    describe('when user has errors & is loading', () => {
      beforeEach(() => {
        withUser.mockImplementation(ComposedComponent => () => (
          <ComposedComponent
            currentUserData={{
              currentUser: {
                id: 1
              }
            }}
            currentUserLoading={true}
            currentUserError={{ anything: 'here' }}
          />
        ));
      });
      it('returns loading text', () => {
        const wrapper = create();
        expect(wrapper.contains(<div>Loading</div>));
      });
    });
  });
});
