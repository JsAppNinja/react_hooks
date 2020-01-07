import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@common/components/common';
import ButtonBase from '@material-ui/core/ButtonBase';
import { getUrlWithSearch } from '@user/components/search/SearchBarForm/helpers';
import ReservationDetail from './ReservationDetail';

ReservationDetailCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    addresses: PropTypes.array
  }),
  history: PropTypes.object,
  reservation: PropTypes.object
};

export const DetailSection = props => <Box my={2} {...props} />;

function ReservationDetailCard({ property, history, reservation }) {
  const handleEdit = () => {
    history.push(getUrlWithSearch(`/hotels/${property.id}`));
  };

  return (
    <Box component={Paper} p={3} position="relative">
      <Typography variant="h2">Your Reservation</Typography>
      <Divider />
      <ReservationDetail property={property} reservation={reservation} />
      <Box align="center">
        <ButtonBase onClick={handleEdit}>
          <Typography variant="h3">CHANGE?</Typography>
        </ButtonBase>
      </Box>
    </Box>
  );
}

export default withRouter(ReservationDetailCard);
