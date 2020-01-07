import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { formatCurrency } from '@common/helpers/currency';
import RateCell, { CELL_TYPES } from './RateCell';

const defaultDaysOfWeek = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false
};

const RateColumn = ({
  withDatesHeader,
  rate,
  headerBgcolor,
  bodyColor,
  onSave
}) => {
  const [passedRate, setPassedRate] = useState(rate);
  const onInventoryValueSave = async value => {
    const result = await onSave({
      dateRange: {
        startDate: rate.date.fullDate,
        endDate: rate.date.fullDate
      },
      daysOfWeek: {
        ...defaultDaysOfWeek,
        [rate.date.fullDayOfWeek]: true
      },
      incrementInventory: false,
      inventory: value
    });
    if (result) {
      setPassedRate({
        ...passedRate,
        inventory: value
      });
    }
  };
  const onRateValueSave = async value => {
    const result = await onSave({
      dateRange: {
        startDate: rate.date.fullDate,
        endDate: rate.date.fullDate
      },
      daysOfWeek: {
        ...defaultDaysOfWeek,
        [rate.date.fullDayOfWeek]: true
      },
      price: Math.round(value * 100)
    });
    if (result) {
      setPassedRate({
        ...passedRate,
        price: value,
        formattedPrice: formatCurrency(value * 100)
      });
    }
  };

  return (
    <Box flex={1} display="flex" flexDirection="column">
      {withDatesHeader && (
        <Box
          height={60}
          bgcolor={headerBgcolor}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="white"
        >
          <Typography
            variant="body1"
            children={rate.date.dayOfWeek}
            css={{ textTransform: 'uppercase' }}
          />
          <Typography variant="body2" children={rate.date.date} />
        </Box>
      )}
      <RateCell
        cellType={CELL_TYPES.INVENTORY}
        rate={passedRate}
        color={bodyColor}
        onSave={onInventoryValueSave}
      />
      <RateCell
        cellType={CELL_TYPES.RATE}
        rate={passedRate}
        color={bodyColor}
        onSave={onRateValueSave}
      />
    </Box>
  );
};

RateColumn.propTypes = {
  withDatesHeader: PropTypes.bool,
  rate: PropTypes.object.isRequired,
  headerBgcolor: PropTypes.string.isRequired,
  bodyColor: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired
};

export default RateColumn;
