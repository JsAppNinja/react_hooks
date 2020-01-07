import moment from 'moment';
import { formatCurrency } from '@common/helpers/currency';

export const composeViewDates = (startDate, datesCount) => {
  const dates = [];
  let dateIterator = null;

  for (let i = 0; i < datesCount; i++) {
    dateIterator = startDate.clone().add(i, 'days');
    dates.push({
      dayOfWeek: dateIterator.format('ddd'),
      fullDayOfWeek: dateIterator.format('dddd').toLowerCase(),
      date: dateIterator.format('MMM D'),
      fullDate: dateIterator.format('YYYY-MM-DD')
    });
  }

  return dates;
};

const generateInitialCells = ({
  outerStartDate,
  innerStartDate,
  outerDatesCount,
  innerDatesCount
}) => {
  const dates = composeViewDates(outerStartDate, outerDatesCount);

  return dates.map(date => {
    let outOfScope = false;
    const fullDate = moment(date.fullDate).startOf('day');

    if (
      fullDate.isBefore(innerStartDate) ||
      fullDate.isAfter(innerStartDate.clone().add(innerDatesCount - 1, 'days'))
    ) {
      outOfScope = true;
    }
    return {
      date,
      inventory: null,
      price: null,
      outOfScope
    };
  });
};

export const transformRates = ({
  outerStartDate,
  innerStartDate,
  outerDatesCount,
  innerDatesCount,
  rates
}) => {
  const generatedCells = generateInitialCells({
    outerStartDate,
    innerStartDate,
    outerDatesCount,
    innerDatesCount
  });
  const originalDate = outerStartDate.clone().startOf('day');
  let comparedDate = null;
  let diffDays = 0;
  let ratePrice = 0;

  rates.slice(0, outerDatesCount).forEach(rate => {
    comparedDate = moment(rate.date).startOf('day');
    diffDays = comparedDate.diff(originalDate, 'days');
    ratePrice = rate.price ? rate.price : 0;
    if (diffDays >= outerDatesCount) {
      return;
    }
    generatedCells[diffDays] = {
      ...generatedCells[diffDays],
      id: rate.id,
      inventory: rate.inventory,
      price: parseFloat((ratePrice / 100).toFixed(2)),
      formattedPrice: formatCurrency(ratePrice)
    };
  });

  return generatedCells;
};

export const generateMonthSelectOptions = () => {
  const month = moment().startOf('month');
  const months = [];

  for (let i = 0; i < 18; i++) {
    months.push({
      label: month.format('MMMM, YYYY'),
      value: month.format('YYYY-MM-DD')
    });
    month.add(1, 'months');
  }

  return months;
};
