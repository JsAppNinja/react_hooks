import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';

export const RANKING_POSITIONS = {
  LEFT_TOP: 'leftTop',
  RIGHT_TOP: 'rightTop'
};

const RecommendationRanking = ({ ranking, pos, ...rest }) => {
  let positionProps = null;
  if (pos === RANKING_POSITIONS.LEFT_TOP) {
    positionProps = { left: 10, top: -15 };
  } else if (pos === RANKING_POSITIONS.RIGHT_TOP) {
    positionProps = { right: 10, top: -15 };
  }

  return (
    <Box position="absolute" {...positionProps} {...rest}>
      <Fab color="primary" size="small">
        {ranking}
      </Fab>
    </Box>
  );
};

RecommendationRanking.propTypes = {
  ranking: PropTypes.number,
  pos: PropTypes.string
};

RecommendationRanking.defaultProps = {
  pos: RANKING_POSITIONS.RIGHT_TOP
};

export default RecommendationRanking;
