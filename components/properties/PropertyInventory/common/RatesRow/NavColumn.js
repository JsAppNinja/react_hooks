import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const NavColumn = ({
  direction,
  withDatesHeader,
  withNav,
  onPrevClick,
  onNextClick
}) => (
  <Box width={60} display="flex" flexDirection="column">
    {withDatesHeader && (
      <Box
        height={60}
        bgcolor="#4a4a4a"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {withNav && (
          <Box>
            {direction === 'prev' ? (
              <IconButton onClick={onPrevClick}>
                <ChevronLeftIcon css={{ color: 'white' }} />
              </IconButton>
            ) : (
              <IconButton onClick={onNextClick}>
                <ChevronRightIcon css={{ color: 'white' }} />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
    )}
    <Box height={60} borderBottom={1} borderColor="lightGrey" />
    <Box height={60} />
  </Box>
);

NavColumn.propTypes = {
  direction: PropTypes.oneOf(['prev', 'next']),
  withDatesHeader: PropTypes.bool,
  withNav: PropTypes.bool,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func
};

NavColumn.defaultProps = {
  onPrevClick: noop,
  onNextClick: noop
};

export default NavColumn;
