import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { RatesRow } from '@common/components/properties/PropertyInventory/common';
import { transformRates } from '@common/components/properties/PropertyInventory/helpers';

const ItemBody = ({
  startDate,
  item,
  onSaveRate,
  onPrevClick,
  onNextClick
}) => {
  const innerDatesCount = startDate.daysInMonth();
  const startDelta = (startDate.day() + 6) % 7;
  const outerStartDate = startDate.clone().subtract(startDelta, 'days');
  const daysWithPrevious = innerDatesCount + startDelta;
  const totalWeeks = Math.ceil(daysWithPrevious / 7);
  const outerDatesCount = 7 * totalWeeks;
  const rates = transformRates({
    outerStartDate,
    innerStartDate: startDate,
    outerDatesCount,
    innerDatesCount,
    rates: item.rates
  });
  const rows = [];

  for (let i = 0; i < totalWeeks; i++) {
    rows.push(rates.slice(7 * i, 7 * i + 7));
  }

  return (
    <Box>
      {rows.map((row, index) => (
        <RatesRow
          key={`row_${index}`}
          withDatesHeader
          withNav={index === 0}
          rates={row}
          onSaveRate={onSaveRate}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
        />
      ))}
    </Box>
  );
};

ItemBody.propTypes = {
  startDate: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onSaveRate: PropTypes.func.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired
};

export default ItemBody;
