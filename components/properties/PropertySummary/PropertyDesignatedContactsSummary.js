import React from 'react';
import PropTypes from 'prop-types';
import { get, groupBy } from 'lodash';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { FormSummarySection } from '@common/components/form';

const PropertyDesignatedContactsSummary = ({ values, children, ...rest }) => {
  const contacts = get(values, 'nonbookingContacts', []).filter(c => c.name);
  const groupedContacts = groupBy(contacts, 'departmentName');

  return (
    <Box {...rest}>
      {Object.keys(groupedContacts).map(departmentName => {
        const departmentContacts = groupedContacts[departmentName].map(c => ({
          label: c.name,
          value: (
            <Box display="flex">
              <Box
                component={Typography}
                width={1 / 3}
                variant="body2"
                children={c.email}
              />
              <Box
                component={Typography}
                flex={1}
                variant="body2"
                children={c.phone}
              />
            </Box>
          )
        }));

        return (
          <FormSummarySection
            key={departmentName}
            title={departmentName}
            values={departmentContacts}
          />
        );
      })}
      {children}
    </Box>
  );
};

PropertyDesignatedContactsSummary.propTypes = {
  values: PropTypes.object,
  children: PropTypes.node
};

export default PropertyDesignatedContactsSummary;
