import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Query, compose, graphql } from 'react-apollo';
import { useSnackbar } from 'notistack';
import { get, isArray } from 'lodash';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Loader, AlertPanel, Button, NavLink } from '@common/components/common';
import { ALERT_TYPES } from '@common/components/common/AlertPanel';
import {
  SEARCH_ROOM_TYPES_RATES,
  SAVE_RATES_MUTATION
} from '@common/components/properties/PropertyInventory/common';
import { CONNECTIVITY_METHODS } from '@constants/property-connectivity-methods';
import ListHead from './ListHead';
import ListBody from './ListBody';

const now = moment().startOf('day');
const gqlDataPath = 'searchInventory';

const RoomTypesRatesView = ({
  title,
  property,
  photoUploadDisabled,
  onRoomTypeClick,
  switchToEditMode,
  saveRates,
  saveRatesResult, // eslint-disable-line
  staticContext, // eslint-disable-line
  ...rest
}) => {
  const [startDate, setStartDate] = useState(now);
  const { enqueueSnackbar } = useSnackbar();
  const propertyId = property.id;
  const onSaveRate = async (roomTypeId, values) => {
    try {
      const variables = {
        ...values,
        roomTypeId
      };
      const resp = await saveRates({ variables });
      const result = get(resp, 'data.saveRates');

      if (result && result.length > 0) {
        enqueueSnackbar('Saved successfully!', { variant: 'success' });
        return true;
      }
      enqueueSnackbar('Not saved. Please try again later!', {
        variant: 'warning'
      });
      return false;
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
      return false;
    }
  };
  const onPrevClick = () => {
    if (startDate.isSameOrBefore(now)) {
      return;
    }
    setStartDate(startDate.clone().subtract(10, 'days'));
  };
  const onNextClick = () => setStartDate(startDate.clone().add(10, 'days'));
  const onManageInventoryClick = () =>
    switchToEditMode(property.roomTypes[0].id);

  const variables = { propertyId, startDate: startDate.format('YYYY-MM-DD') };
  const gridPanel =
    !isArray(property.roomTypes) || property.roomTypes.length === 0 ? (
      <AlertPanel type={ALERT_TYPES.INFO} text="No room types found!" />
    ) : (
      <Grid container>
        <Grid item xs={12} sm={2}>
          <ListHead
            roomTypes={property.roomTypes || []}
            onRoomTypeClick={onRoomTypeClick}
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Query
            query={SEARCH_ROOM_TYPES_RATES}
            variables={variables}
            fetchPolicy="cache-and-network"
          >
            {({ error, loading, data }) => {
              if (error) {
                return (
                  <AlertPanel type={ALERT_TYPES.ERROR} text={error.message} />
                );
              }
              if (loading) {
                return <Loader />;
              }

              const results = get(data, gqlDataPath, []);
              const composedResults = (property.roomTypes || []).map(roomType =>
                results.find(item => item.id === roomType.id)
              );

              return (
                <ListBody
                  startDate={startDate}
                  items={composedResults}
                  onSaveRate={onSaveRate}
                  onPrevClick={onPrevClick}
                  onNextClick={onNextClick}
                />
              );
            }}
          </Query>
        </Grid>
      </Grid>
    );

  return (
    <Box {...rest}>
      <Box
        component={Paper}
        width={1}
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography component="h3" variant="h4" children={title} />
        <Box display="flex" alignItems="center">
          {property.rateSource === CONNECTIVITY_METHODS.MANUAL && (
            <Box display="flex" alignItems="center">
              <NavLink to="/inventory/csv">
                <Button children="Manage Inventory with CSV" mr={1} />
              </NavLink>
              <NavLink to="/inventory/close-property">
                <Button children="Close Property" />
              </NavLink>
            </Box>
          )}
          {property.rateSource !== CONNECTIVITY_METHODS.MANUAL &&
            switchToEditMode &&
            isArray(property.roomTypes) &&
            property.roomTypes.length > 0 && (
              <Button
                children="Manage Inventory"
                onClick={onManageInventoryClick}
              />
            )}
        </Box>
      </Box>
      {gridPanel}
    </Box>
  );
};

RoomTypesRatesView.propTypes = {
  title: PropTypes.string.isRequired,
  property: PropTypes.object.isRequired,
  photoUploadDisabled: PropTypes.bool,
  onRoomTypeClick: PropTypes.func.isRequired,
  switchToEditMode: PropTypes.func,
  saveRates: PropTypes.func.isRequired
};

const enhance = compose(graphql(SAVE_RATES_MUTATION, { name: 'saveRates' }));

export default enhance(RoomTypesRatesView);
