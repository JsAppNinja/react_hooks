import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Query, compose, graphql } from 'react-apollo';
import { get, isArray, isEmpty } from 'lodash';
import { useSnackbar } from 'notistack';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import { Loader, AlertPanel, NavLink } from '@common/components/common';
import { ALERT_TYPES } from '@common/components/common/AlertPanel';
import {
  SEARCH_ROOM_TYPES_RATES,
  CLOSE_PROPERTY_MUTATION
} from '@common/components/properties/PropertyInventory/common';
import { composeViewDates } from '@common/components/properties/PropertyInventory/helpers';
import PanelBody from './PanelBody';

const now = moment().startOf('day');
const gqlDataPath = 'searchInventory';

const ClosePropertyView = ({
  property,
  closeProperty,
  closePropertyResult, // eslint-disable-line
  staticContext, // eslint-disable-line
  ...rest
}) => {
  const [startDate, setStartDate] = useState(now);
  const { enqueueSnackbar } = useSnackbar();
  const propertyId = property.id;
  const onPrevClick = () => {
    if (startDate.isSameOrBefore(now)) {
      return;
    }
    setStartDate(startDate.clone().subtract(10, 'days'));
  };
  const onNextClick = () => setStartDate(startDate.clone().add(10, 'days'));
  const onCloseProperty = async (values, { setSubmitting }) => {
    try {
      await closeProperty({
        variables: {
          ...values,
          propertyId
        }
      });

      enqueueSnackbar('Property closed on selected dates successfully!', {
        variant: 'success'
      });
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
    setSubmitting(false);
  };

  const variables = { propertyId, startDate: startDate.format('YYYY-MM-DD') };

  return (
    <Box {...rest}>
      {!isArray(property.roomTypes) || isEmpty(property.roomTypes) ? (
        <AlertPanel type={ALERT_TYPES.INFO} text="No room types found!" />
      ) : (
        <Box component={Paper} p={2}>
          <Box mb={2} display="flex" alignItems="center">
            <NavLink to="/inventory/room-types">
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
            </NavLink>
            <Typography variant="h2" children="Close Property" />
          </Box>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Box mr={2}>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Query
                query={SEARCH_ROOM_TYPES_RATES}
                variables={variables}
                fetchPolicy="cache-and-network"
              >
                {({ error, loading, data }) => {
                  if (error) {
                    return (
                      <AlertPanel
                        type={ALERT_TYPES.ERROR}
                        text={error.message}
                      />
                    );
                  }
                  if (loading) {
                    return <Loader />;
                  }

                  const results = get(data, gqlDataPath, []);
                  const composedRates = composeViewDates(startDate, 10).map(
                    date => ({
                      date,
                      stopSold: null
                    })
                  );
                  results.forEach(roomTypeData => {
                    roomTypeData.rates.forEach(rate => {
                      const foundRateIndex = composedRates.findIndex(
                        r => r.date.fullDate === rate.date
                      );
                      if (foundRateIndex >= 0) {
                        if (composedRates[foundRateIndex].stopSold === null) {
                          composedRates[foundRateIndex].stopSold =
                            rate.stopSold;
                        } else {
                          composedRates[foundRateIndex].stopSold =
                            composedRates[foundRateIndex].stopSold &&
                            rate.stopSold;
                        }
                      }
                    });
                  });

                  return (
                    <PanelBody
                      rates={composedRates}
                      onPrevClick={onPrevClick}
                      onNextClick={onNextClick}
                      onCloseProperty={onCloseProperty}
                    />
                  );
                }}
              </Query>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

ClosePropertyView.propTypes = {
  property: PropTypes.object.isRequired,
  closeProperty: PropTypes.func.isRequired
};

const enhance = compose(
  graphql(CLOSE_PROPERTY_MUTATION, { name: 'closeProperty' })
);

export default enhance(ClosePropertyView);
