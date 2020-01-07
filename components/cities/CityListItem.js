import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

const CityListItem = ({ city, onSelect, selected }) => (
  <ListItem button selected={selected} onClick={onSelect}>
    <ListItemText>{city.name}</ListItemText>
  </ListItem>
);

CityListItem.propTypes = {
  city: PropTypes.object,
  onSelect: PropTypes.func,
  selected: PropTypes.bool
};

export default React.memo(CityListItem);
