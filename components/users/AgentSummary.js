import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FormSummary, FormSummarySection } from '@common/components/form';

const AgentSummary = ({ title, values, onChangeStep, children, ...rest }) => {
  const agentInfo = [
    { label: 'First Name', value: values.firstName },
    { label: 'Last Name', value: values.lastName },
    { label: 'Email', value: values.email },
    { label: 'Bio', value: get(values, 'agentProfile.bio') },
    { label: 'Address', value: get(values, 'agentProfile.address.line1') },
    { label: 'City', value: get(values, 'agentProfile.address.city') },
    { label: 'State', value: get(values, 'agentProfile.address.state') },
    { label: 'Zip Code', value: get(values, 'agentProfile.address.zipcode') },
    { label: 'Country', value: get(values, 'agentProfile.address.country') },
    { label: 'Phone', value: get(values, 'agentProfile.phone') },
    {
      label: 'Instagram Handle',
      value: get(values, 'agentProfile.social.instagram.handle', '')
    },
    {
      label: 'Facebook Profile',
      value: get(values, 'agentProfile.social.facebook.handle', '')
    },
    {
      label: 'Linkedin Profile',
      value: get(values, 'agentProfile.social.linkedin.handle', '')
    }
  ];

  const citiesInfo = {
    label: 'Cities',
    value: (values.cities || []).map(city => city.name).join(', ')
  };
  const propertiesInfo = {
    label: 'Recommended Hotels',
    value: values.agentProfile.recommendedHotelsForApplication
  };

  const questionnaireInfo = values.agentProfile.questionnaire
    ? values.agentProfile.questionnaire.map(q => ({
        label: q.question,
        value: q.answer
      }))
    : [];

  return (
    <Box {...rest}>
      {title && (
        <Box textAlign="center" mb={3}>
          <Typography variant="h3">{title}</Typography>
        </Box>
      )}
      <FormSummary
        mb={3}
        onEdit={onChangeStep ? () => onChangeStep(1) : undefined}
      >
        <FormSummarySection
          title="Benny Account Information"
          values={agentInfo}
        />
      </FormSummary>
      <FormSummary
        mb={3}
        onEdit={onChangeStep ? () => onChangeStep(2) : undefined}
      >
        <FormSummarySection
          title="Selected Cities and Hotels"
          values={[citiesInfo, propertiesInfo]}
        />
      </FormSummary>
      <FormSummary
        mb={3}
        onEdit={onChangeStep ? () => onChangeStep(3) : undefined}
      >
        <FormSummarySection title="Questionnaire" values={questionnaireInfo} />
      </FormSummary>
      {children}
    </Box>
  );
};

AgentSummary.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  values: PropTypes.object,
  onChangeStep: PropTypes.func
};

export default AgentSummary;
