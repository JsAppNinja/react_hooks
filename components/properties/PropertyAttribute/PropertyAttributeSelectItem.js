import React from 'react';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import { Icon } from '@common/components/common';

PropertyAttributeItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  option: PropTypes.object
};

const StyledChip = styled(Chip)({
  paddingLeft: '10px'
});

export default function PropertyAttributeItem({
  checked,
  option: attribute,
  onChange,
  ...rest
}) {
  const handleClick = () => {
    onChange(attribute.value);
  };

  return (
    <Box {...rest}>
      <StyledChip
        onClick={handleClick}
        variant="default"
        color={checked ? 'secondary' : 'default'}
        icon={<Icon svg icon={attribute.icon} />}
        label={attribute.label}
      />
    </Box>
  );
}
