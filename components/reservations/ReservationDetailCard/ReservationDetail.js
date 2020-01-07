import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import pluralize from 'pluralize';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { getFullAddressFromArray } from '@common/helpers/address';
import { formatCurrency } from '@common/helpers/currency';

ReservationDetail.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    addresses: PropTypes.array
  }),
  reservation: PropTypes.object
};

export const DetailSection = props => <Box my={4} {...props} />;

function ReservationDetail({ property, reservation }) {
  const { roomType } = reservation;
  const guests = [
    reservation.numAdults > 0 &&
      pluralize('Adult', reservation.numAdults, true),
    reservation.numKids > 0 && pluralize('Kid', reservation.numKids, true)
  ]
    .filter(n => n)
    .join(', ');
  return (
    <>
      <DetailSection>
        <Typography variant="h3">{property.name}</Typography>
        <Typography variant="subtitle1">
          {getFullAddressFromArray(property.addresses)}
        </Typography>
      </DetailSection>
      <DetailSection>
        <Typography variant="h3">
          {roomType.name}, {guests}
        </Typography>
      </DetailSection>
      <DetailSection>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3">Check in:</Typography>
          <Typography variant="body1">
            {moment(reservation.startDate).format('MMM D, YYYY')}
          </Typography>
        </Box>
        <br />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3">Check out:</Typography>
          <Typography variant="body1">
            {moment(reservation.endDate).format('MMM D, YYYY')}
          </Typography>
        </Box>
      </DetailSection>
      <DetailSection>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3">Subtotal:</Typography>
          <Typography variant="body1">
            {formatCurrency(reservation.total - reservation.taxes)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3">Taxes:</Typography>
          <Typography variant="body1">
            {formatCurrency(reservation.taxes)}
          </Typography>
        </Box>
      </DetailSection>
      <DetailSection>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3">Total Cost:</Typography>
          <Typography variant="body1">
            {formatCurrency(reservation.total)}
          </Typography>
        </Box>
      </DetailSection>
    </>
  );
}

export default ReservationDetail;
