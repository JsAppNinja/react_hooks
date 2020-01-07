import React from 'react';
import PropTypes from 'prop-types';
import { flatten } from 'lodash';
import Box from '@material-ui/core/Box';
import { FormSummarySection } from '@common/components/form';

const CANCELLATION_CHARGE_LABELS_MAP = {
  first_night: 'Cost of First Night Room + Tax',
  total_stay: 'Cost of Total Stay'
};

const PropertyFeeSummary = ({ values, children, isTaxEditable, ...rest }) => {
  const feesInfo = values.fees
    ? flatten(
        values.fees.map((fee, index) => [
          { label: `Fee ${index + 1}`, value: fee.amount },
          { label: `Fee Type ${index + 1}`, value: fee.name }
        ])
      )
    : null;
  const taxInfo = [
    {
      label: 'Paid at',
      value: values.taxesPaidAtBooking
    }
  ];
  const cancellationInfo = values.cancelWithinAmount
    ? values.nonRefundable
      ? [
          {
            value: 'Non Refundable'
          }
        ]
      : [
          {
            label: 'Cancel within',
            value: `${values.cancelWithinAmount} ${values.cancelWithinUnit}`
          },
          {
            label: 'What is the cancellation fee',
            value: CANCELLATION_CHARGE_LABELS_MAP[values.cancellationCharge]
          }
        ]
    : null;

  return (
    <Box {...rest}>
      <FormSummarySection title="Hotel Fees" values={feesInfo} />
      {isTaxEditable && (
        <FormSummarySection title="Hotel Taxes" values={taxInfo} />
      )}
      <FormSummarySection
        title="Cancellation Policy"
        values={cancellationInfo}
        mb={3}
      />
      {children}
    </Box>
  );
};

PropertyFeeSummary.propTypes = {
  values: PropTypes.object,
  isTaxEditable: PropTypes.bool,
  children: PropTypes.node
};

export default PropertyFeeSummary;
