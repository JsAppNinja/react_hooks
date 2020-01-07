import React from 'react';
import { styled } from '@material-ui/core/styles';
import { default as MuiDivider } from '@material-ui/core/Divider';

import { colors } from '@constants/style';

const Divider = styled(MuiDivider)({
  backgroundColor: colors.purple,
  height: '3px',
  margin: '11px 0'
});

export default Divider;
