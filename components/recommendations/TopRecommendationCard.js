import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from '@common/components/common';
import { formatCurrency } from '@common/helpers/currency';
import { getUrlWithSearch } from '@user/components/search/SearchBarForm/helpers';
import { fonts, backupFontStack } from '@constants/style';

const Recommendation = styled(Link)({
  display: 'grid',
  gridTemplateColumns: '10% auto 20%',
  textAlign: 'left',
  fontFamily: `${fonts.caption}, ${backupFontStack.caption}`
});

const TopRecommendationCard = ({ id, name, ranking, bestRate, ...rest }) => {
  const price = bestRate ? formatCurrency(bestRate.price) : null;

  return (
    <Box {...rest}>
      <Recommendation to={getUrlWithSearch(`hotels/${id}`)}>
        <Box>
          <Typography variant="subtitle1">{ranking}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">{`${name}`}</Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="subtitle1">{price ? price : null}</Typography>
        </Box>
      </Recommendation>
    </Box>
  );
};

TopRecommendationCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  ranking: PropTypes.number,
  bestRate: PropTypes.object
};

export default TopRecommendationCard;
