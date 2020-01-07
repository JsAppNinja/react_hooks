import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MuiTooltip from '@material-ui/core/Tooltip';

const arrowGenerator = color => ({
  '&[x-placement*="bottom"] $arrow': {
    top: 0,
    left: 0,
    marginTop: '-0.95em',
    width: '2em',
    height: '1em',
    '&::before': {
      borderWidth: '0 1em 1em 1em',
      borderColor: `transparent transparent ${color} transparent`
    }
  },
  '&[x-placement*="top"] $arrow': {
    bottom: 0,
    left: 0,
    marginBottom: '-0.95em',
    width: '2em',
    height: '1em',
    '&::before': {
      borderWidth: '1em 1em 0 1em',
      borderColor: `${color} transparent transparent transparent`
    }
  },
  '&[x-placement*="right"] $arrow': {
    left: 0,
    marginLeft: '-0.95em',
    height: '2em',
    width: '1em',
    '&::before': {
      borderWidth: '1em 1em 1em 0',
      borderColor: `transparent ${color} transparent transparent`
    }
  },
  '&[x-placement*="left"] $arrow': {
    right: 0,
    marginRight: '-0.95em',
    height: '2em',
    width: '1em',
    '&::before': {
      borderWidth: '1em 0 1em 1em',
      borderColor: `transparent transparent transparent ${color}`
    }
  }
});

const useStylesTooltip = makeStyles(theme => ({
  tooltip: {
    position: 'relative',
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white
  },
  arrow: {
    position: 'absolute',
    fontSize: 6,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    }
  },
  popper: arrowGenerator(theme.palette.common.white)
}));

const Tooltip = props => {
  const { arrow, ...classes } = useStylesTooltip();
  const [arrowRef, setArrowRef] = React.useState(null);

  return (
    <MuiTooltip
      classes={classes}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef
            }
          }
        }
      }}
      {...props}
      title={
        <>
          <Typography component="span">{props.title}</Typography>
          <Typography component="span" className={arrow} ref={setArrowRef} />
        </>
      }
    />
  );
};

Tooltip.propTypes = {
  title: PropTypes.node
};

export default Tooltip;
