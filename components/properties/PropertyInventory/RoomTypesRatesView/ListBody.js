import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { RatesRow } from '@common/components/properties/PropertyInventory/common';
import { transformRates } from '@common/components/properties/PropertyInventory/helpers';

const ListBody = ({
  startDate,
  items,
  onSaveRate,
  onPrevClick,
  onNextClick
}) => (
  <Box>
    {items.map((item, index) => {
      const rates = transformRates({
        outerStartDate: startDate,
        innerStartDate: startDate,
        outerDatesCount: 10,
        innerDatesCount: 10,
        rates: item.rates
      });

      return (
        <Box component={Paper} key={item.id} mb={1}>
          <RatesRow
            withDatesHeader={index === 0}
            withNav={index === 0}
            rates={rates}
            onSaveRate={values => onSaveRate(item.id, values)}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        </Box>
      );
    })}
  </Box>
);

ListBody.propTypes = {
  startDate: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSaveRate: PropTypes.func.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired
};

export default ListBody;
