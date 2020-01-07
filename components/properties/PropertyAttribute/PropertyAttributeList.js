import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import PROPERTY_ATTRIBUTES from '@constants/property-attributes';
import PropertyAttributeItem from './PropertyAttributeItem';

const PropertyAttributeList = ({ value, showLabels, ...rest }) => {
  // @TODO Should remove dummy data display when api returns some data
  let items = value;
  if (!value.length) {
    items = PROPERTY_ATTRIBUTES.slice(0, 2).map(item => item.value);
  }
  // end

  return (
    <Box display="flex" flexWrap="wrap" {...rest}>
      {items.map(v => {
        const attr = PROPERTY_ATTRIBUTES.find(p => p.value === v);

        if (!attr) {
          return null;
        }
        return (
          <PropertyAttributeItem
            key={attr.value}
            attribute={attr}
            showLabel={showLabels}
            mr={1}
            mb={1}
          />
        );
      })}
    </Box>
  );
};

PropertyAttributeList.propTypes = {
  value: PropTypes.array,
  showLabels: PropTypes.bool
};

PropertyAttributeList.defaultProps = {
  showLabels: false
};

export default PropertyAttributeList;
