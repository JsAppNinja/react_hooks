import React from 'react';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import { Icon } from '@common/components/common';
import { colors } from '@constants/style';

PropertyAttributeItem.propTypes = {
  attribute: PropTypes.object,
  showLabel: PropTypes.bool
};

PropertyAttributeItem.defaultProps = {
  showLabel: false
};

const AttributeLabeledIcon = styled(Chip)({
  backgroundColor: colors.yellow,
  color: colors.white
});

export default function PropertyAttributeItem({
  attribute,
  showLabel,
  ...rest
}) {
  return (
    <Box {...rest}>
      {showLabel ? (
        <AttributeLabeledIcon
          size="small"
          icon={<Icon svg icon={attribute.icon} />}
          label={attribute.label}
        />
      ) : (
        <Icon
          svg
          color="primary"
          icon={attribute.icon}
          tooltip={attribute.label}
        />
      )}
    </Box>
  );
}
