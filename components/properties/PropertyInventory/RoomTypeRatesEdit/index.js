import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { compose, graphql, Query } from 'react-apollo';
import { get, omit } from 'lodash';
import { useSnackbar } from 'notistack';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { Loader, AlertPanel, Button } from '@common/components/common';
import { ALERT_TYPES } from '@common/components/common/AlertPanel';
import {
  SEARCH_ROOM_TYPE_RATES,
  SAVE_RATES_MUTATION
} from '@common/components/properties/PropertyInventory/common';
import ItemHead from './ItemHead';
import ItemBody from './ItemBody';

const now = moment().startOf('month');
const gqlDataPath = 'searchInventory';

const RoomTypeRatesEdit = ({
  title,
  roomTypeId,
  property,
  onRoomTypeChange,
  onBack,
  saveRates,
  saveRatesResult, // eslint-disable-line
  ...rest
}) => {
  const propertyId = property.id;
  const roomTypes = property.roomTypes;
  const [startDate, setStartDate] = useState(now);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [updatedRateIds, setUpdatedRateIds] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const onPrevClick = () => {
    if (startDate.isSameOrBefore(now)) {
      return;
    }
    setStartDate(startDate.clone().subtract(1, 'months'));
  };
  const onNextClick = () => {
    if (startDate.diff(now, 'months') >= 17) {
      return;
    }
    setStartDate(startDate.clone().add(1, 'months'));
  };
  const onSelectedDateChange = (name, value) => {
    if (name !== 'startDate') {
      return;
    }
    const monthStartDate = moment(value).startOf('month');
    if (!startDate.isSame(monthStartDate)) {
      setStartDate(monthStartDate);
    }
  };
  const onSelectedRoomTypeChange = evt => onRoomTypeChange(evt.target.value);
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const variables = {
        dateRange: values.dates,
        daysOfWeek: omit(values, ['dates', 'rate', 'inventory']),
        incrementInventory: true,
        price: Math.round(parseFloat(values.rate) * 100),
        inventory: values.inventory,
        roomTypeId
      };
      const resp = await saveRates({ variables });
      const result = get(resp, 'data.saveRates');

      if (result && result.length > 0) {
        setUpdateToggle(!updateToggle);
        setUpdatedRateIds(result.map(r => r.id));
        enqueueSnackbar('Rates saved successfully!', { variant: 'success' });
      } else {
        enqueueSnackbar('Rates were not saved. Please try again later!', {
          variant: 'warning'
        });
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
    setSubmitting(false);
  };

  const onSaveRate = async values => {
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

  const variables = {
    propertyId,
    startDate: startDate.format('YYYY-MM-DD'),
    roomTypeId
  };

  return (
    <Box {...rest}>
      <Paper>
        <Box
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography component="h3" variant="h4" children={title} />
          <Button onClick={onBack} variant="text">
            <ArrowBackIcon />
            <Box ml={2}>
              <Typography variant="body1">Back to inventory</Typography>
            </Box>
          </Button>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <ItemHead
              monthStartDate={startDate}
              roomTypeId={roomTypeId}
              roomTypes={roomTypes}
              onSelectedDateChange={onSelectedDateChange}
              onSelectedRoomTypeChange={onSelectedRoomTypeChange}
              onSubmit={handleSubmit}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Query
              key={updateToggle.toString()}
              query={SEARCH_ROOM_TYPE_RATES}
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

                const result = get(data, gqlDataPath, [{}])[0];

                return (
                  <ItemBody
                    startDate={startDate}
                    item={result}
                    updatedRates={updatedRateIds}
                    onSaveRate={onSaveRate}
                    onPrevClick={onPrevClick}
                    onNextClick={onNextClick}
                    roomTypeId={roomTypeId}
                  />
                );
              }}
            </Query>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

RoomTypeRatesEdit.propTypes = {
  title: PropTypes.string.isRequired,
  roomTypeId: PropTypes.number.isRequired,
  property: PropTypes.object.isRequired,
  onRoomTypeChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  saveRates: PropTypes.func.isRequired
};

const enhance = compose(graphql(SAVE_RATES_MUTATION, { name: 'saveRates' }));

export default enhance(RoomTypeRatesEdit);
