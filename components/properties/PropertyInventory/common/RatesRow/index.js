import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Box from '@material-ui/core/Box';
import HeadColumn from './HeadColumn';
import NavColumn from './NavColumn';
import RateColumn from './RateColumn';

const RatesRow = ({
  withDatesHeader,
  withNav,
  rates,
  updatedRates,
  onSaveRate,
  onPrevClick,
  onNextClick
}) => (
  <Box width={1} display="flex" alignItems="stretch">
    <HeadColumn withDatesHeader={withDatesHeader} />
    <Box flex={1} display="flex" alignItems="stretch">
      <NavColumn
        direction="prev"
        withDatesHeader={withDatesHeader}
        withNav={withNav}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
      />
      {rates.map((rate, index) => {
        const headerBgcolor = updatedRates.includes(rate.id)
          ? '#929292'
          : '#4a4a4a';
        const bodyColor = updatedRates.includes(rate.id)
          ? '#a81b8d'
          : '#fcb525';

        return (
          <RateColumn
            key={`column_${index}`}
            withDatesHeader={withDatesHeader}
            rate={rate}
            headerBgcolor={headerBgcolor}
            bodyColor={bodyColor}
            onSave={onSaveRate}
          />
        );
      })}
      <NavColumn
        direction="next"
        withDatesHeader={withDatesHeader}
        withNav={withNav}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
      />
    </Box>
  </Box>
);

RatesRow.propTypes = {
  withDatesHeader: PropTypes.bool,
  withNav: PropTypes.bool,
  rates: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatedRates: PropTypes.arrayOf(PropTypes.number),
  onSaveRate: PropTypes.func.isRequired,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func
};

RatesRow.defaultProps = {
  withDatesHeader: false,
  withNav: false,
  updatedRates: [],
  onPrevClick: noop,
  onNextClick: noop
};

export default RatesRow;
