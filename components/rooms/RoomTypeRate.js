import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button } from '@common/components/common';
import { formatCurrency } from '@common/helpers/currency';
import { getUrlWithSearch } from '@user/components/search/SearchBarForm/helpers';

RoomTypeRate.propTypes = {
  propertyId: PropTypes.number,
  roomTypeId: PropTypes.number,
  history: PropTypes.object,
  hasDate: PropTypes.bool,
  username: PropTypes.string,
  bestRate: PropTypes.shape({
    stopSold: PropTypes.Boolean,
    price: PropTypes.string,
    rateSource: PropTypes.string
  })
};

function RoomTypeRate({
  bestRate,
  hasDate,
  propertyId,
  roomTypeId,
  history,
  username,
  staticContext, // eslint-disable-line
  ...rest
}) {
  const handleBooking = () => {
    history.push(
      getUrlWithSearch(
        username
          ? `/a/${username}/hotels/${propertyId}/rooms/${roomTypeId}/checkout`
          : `/hotels/${propertyId}/rooms/${roomTypeId}/checkout`
      )
    );
  };

  if (!hasDate) {
    return (
      <Box flexDirection="column" justifyContent="center" p={3} {...rest}>
        <Typography variant="body1" color="textSecondary">
          Enter dates to get rates
        </Typography>
      </Box>
    );
  }

  if (bestRate === null) {
    return (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        {...rest}
      >
        <Button data-cy="book-button" disabled>
          Sold Out
        </Button>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-end"
      {...rest}
    >
      <Typography variant="h2">{formatCurrency(bestRate.price)}</Typography>
      /Night &nbsp;
      <Button data-cy="book-button" onClick={handleBooking}>
        Book
      </Button>
    </Box>
  );
}

export default withRouter(RoomTypeRate);
