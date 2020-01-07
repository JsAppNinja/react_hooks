import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import { colors } from '@constants/style';

const StyledArrow = styled(({ active, ...other }) => (
  <ArrowDropDown {...other} />
))({
  width: '50px',
  height: '50px',
  color: props => (props.active ? colors.white : colors.yellow)
});

const Panel = ({ title, children, titleVariant }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ExpansionPanel
      expanded={expanded}
      elevation={0}
      onChange={(event, isExpanded) => {
        setExpanded(isExpanded);
      }}
    >
      <ExpansionPanelSummary
        expandIcon={<StyledArrow active={expanded} />}
        data-cy={`${title}.expand`}
      >
        <Typography
          style={{
            color: expanded ? colors.white : colors.yellow
          }}
          variant={titleVariant}
        >
          {title}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails data-cy={`${title}.content`}>
        <Box width={1}>{children}</Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  titleVariant: PropTypes.string.isRequired,
  children: PropTypes.node
};

Panel.defaultProps = {
  titleVariant: 'h2'
};

export default Panel;
