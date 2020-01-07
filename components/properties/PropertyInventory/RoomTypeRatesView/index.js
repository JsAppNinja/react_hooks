import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Query, compose, graphql } from 'react-apollo';
import { get, isEmpty } from 'lodash';
import { useSnackbar } from 'notistack';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Loader, AlertPanel } from '@common/components/common';
import { ALERT_TYPES } from '@common/components/common/AlertPanel';
import {
  SEARCH_ROOM_TYPE_RATES,
  SAVE_ROOM_TYPE_MUTATION,
  SAVE_RATES_MUTATION
} from '@common/components/properties/PropertyInventory/common';
import ItemHead from './ItemHead';
import ItemBody from './ItemBody';

const now = moment().startOf('month');
const gqlDataPath = 'searchInventory';

const RoomTypeRatesView = ({
  title,
  roomTypeId,
  property,
  photoUploadDisabled,
  onRoomTypeChange,
  onBack,
  saveRoomType,
  saveRoomTypeResult, // eslint-disable-line
  saveRates,
  saveRatesResult, // eslint-disable-line
  ...rest
}) => {
  const [startDate, setStartDate] = useState(now);
  const { enqueueSnackbar } = useSnackbar();
  const propertyId = property.id;
  const roomTypes = get(property, 'roomTypes', []);
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
  const onSelectedMonthChange = evt => setStartDate(moment(evt.target.value));
  const onSelectedRoomTypeChange = evt => onRoomTypeChange(evt.target.value);
  const onSaveRoomType = async (values, { setSubmitting }) => {
    try {
      const resp = await saveRoomType({
        variables: {
          ...values,
          propertyId
        }
      });
      const result = get(resp, 'data.saveRoomType');

      if (result && !isEmpty(result)) {
        onRoomTypeChange(roomTypeId);
        enqueueSnackbar('Room type saved successfully!', {
          variant: 'success'
        });
      } else {
        enqueueSnackbar('Room type was not saved. Please try again later!', {
          variant: 'warning'
        });
      }
    } catch (err) {
      enqueueSnackbar('Error occurred while saving room type.', {
        variant: 'error'
      });
    }
    setSubmitting(false);
  };

  const variables = {
    propertyId,
    startDate: startDate.format('YYYY-MM-DD'),
    roomTypeId
  };

  return (
    <Box {...rest}>
      <Paper>
        <Box p={2}>
          <Typography component="h3" variant="h4" children={title} />
        </Box>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <ItemHead
              startDate={startDate}
              propertyName={property.name}
              roomTypeId={roomTypeId}
              roomTypes={roomTypes}
              photoUploadDisabled={photoUploadDisabled}
              onBack={onBack}
              saveRoomType={onSaveRoomType}
              onSelectedMonthChange={onSelectedMonthChange}
              onSelectedRoomTypeChange={onSelectedRoomTypeChange}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Query
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
                    onSaveRate={onSaveRate}
                    onPrevClick={onPrevClick}
                    onNextClick={onNextClick}
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

RoomTypeRatesView.propTypes = {
  title: PropTypes.string.isRequired,
  roomTypeId: PropTypes.number.isRequired,
  property: PropTypes.object.isRequired,
  photoUploadDisabled: PropTypes.bool,
  onRoomTypeChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  saveRoomType: PropTypes.func.isRequired,
  saveRates: PropTypes.func.isRequired
};

const enhance = compose(
  graphql(SAVE_ROOM_TYPE_MUTATION, { name: 'saveRoomType' }),
  graphql(SAVE_RATES_MUTATION, { name: 'saveRates' })
);

export default enhance(RoomTypeRatesView);
