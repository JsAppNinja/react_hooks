import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Icon, TemporaryDrawer, MenuLink } from '@common/components/common';
import { ProfilePhoto } from '@common/components/photos';
import { get, omit } from 'lodash';
import withUser from '@common/hocs/auth/withUser';

const UserMenu = ({ menuItems, currentUser, ...rest }) => {
  const toggleContent = (
    <ProfilePhoto
      username={get(currentUser, 'username')}
      width={40}
      height={40}
      radius={40}
      shape="circle"
    />
  );
  const listContent = (
    <Fragment>
      <Box p={2}>
        <Typography color="primary" children="My Account" />
      </Box>
      <Divider />
      <List>
        {menuItems.map(({ key, icon, label, ...itemRestProps }) => (
          <MenuLink key={key} display="block" {...itemRestProps}>
            <ListItem button>
              {icon && (
                <ListItemIcon>
                  <Icon icon={icon} />
                </ListItemIcon>
              )}
              <ListItemText inset={!icon} disableTypography>
                {label}
              </ListItemText>
            </ListItem>
          </MenuLink>
        ))}
      </List>
    </Fragment>
  );

  const restProps = omit(rest, [
    'client',
    'history',
    'location',
    'match',
    'mutate',
    'staticContext',
    'currentUser',
    'currentUserLoading',
    'currentUserError',
    'currentUserData'
  ]);

  return (
    <Box {...restProps}>
      <TemporaryDrawer
        toggleContent={toggleContent}
        listContent={listContent}
        side="right"
      />
    </Box>
  );
};

UserMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentUser: PropTypes.object.isRequired
};

export default withUser(UserMenu);
