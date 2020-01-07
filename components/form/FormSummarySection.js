import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

FormSummarySection.propTypes = {
  title: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.node
    })
  ),
  children: PropTypes.node
};

const FormSummarySection = ({ title, values, children, ...rest }) => {
  return (
    <Box {...rest}>
      {title && (
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
      )}
      {children}
      {values && (
        <Box>
          {values.map(({ label, value, ...childProps }, index) => (
            <Box
              key={`summary_${index}`}
              display="flex"
              alignItems="center"
              mb={1}
              {...childProps}
            >
              {label ? (
                <Fragment>
                  <Box
                    component={Typography}
                    width={1 / 3}
                    mr={2}
                    variant="subtitle2"
                    children={`${label}:`}
                  />
                  <Box flex={1} variant="body2" children={value} />
                </Fragment>
              ) : (
                value
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FormSummarySection;
