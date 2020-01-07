import { object, date, number, boolean } from 'yup';

export default object().shape({
  dates: object()
    .shape({
      startDate: date().typeError('Invalid start date'),
      endDate: date().typeError('Invalid end date')
    })
    .required(),
  monday: boolean(),
  tuesday: boolean(),
  wednesday: boolean(),
  thursday: boolean(),
  friday: boolean(),
  saturday: boolean(),
  sunday: boolean(),
  rate: number('Rate should be a number').required('Rate required'),
  inventory: number('Inventory should be a number').required(
    'Inventory required'
  )
});
