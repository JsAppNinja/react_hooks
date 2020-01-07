import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import { Tooltip } from '@common/components/common';

const styles = {
  cell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',

    '& svg': {
      display: 'none'
    },
    '&:hover svg': {
      display: 'block'
    }
  }
};

export const CELL_TYPES = {
  INVENTORY: 'inventory',
  RATE: 'rate'
};
const ENTER_CHAR_CODE = 13;

const RateCell = ({ cellType, rate, color, onSave, classes }) => {
  const [editMode, setEditMode] = useState(false);
  const onEditFieldKeyUp = evt => {
    if (evt.charCode === ENTER_CHAR_CODE) {
      const value = evt.target.value;
      if (!isNaN(Number(value))) {
        onSave(Number(value));
      }
      setEditMode(false);
    }
  };
  const onEditFieldBlur = evt => {
    const value = evt.target.value;
    if (value !== '') {
      if (!isNaN(Number(value))) {
        onSave(Number(value));
      }
    }

    setEditMode(false);
  };
  const cellBgcolor = rate.inventory === 0 ? '#ebebeb' : 'transparent';
  const cellExtraProps =
    cellType === CELL_TYPES.INVENTORY
      ? { borderBottom: 1, borderColor: 'lightGrey', fontWeight: 600 }
      : {};
  const cellEditable = !rate.outOfScope;
  const cellDefaultEditValue =
    cellType === CELL_TYPES.INVENTORY ? rate.inventory : rate.price;
  const cellTextContent =
    cellType === CELL_TYPES.INVENTORY ? rate.inventory : rate.formattedPrice;
  const cellTooltipTitle =
    cellType === CELL_TYPES.INVENTORY ? 'Edit Inventory' : 'Edit Rate';

  return (
    <Box
      bgcolor={cellBgcolor}
      color={color}
      className={classes.cell}
      {...cellExtraProps}
    >
      {editMode ? (
        <TextField
          defaultValue={cellDefaultEditValue}
          onKeyUp={onEditFieldKeyUp}
          onBlur={onEditFieldBlur}
          autoFocus
          inputProps={{
            style: { textAlign: 'center' }
          }}
        />
      ) : (
        <>
          <Typography component="span" children={cellTextContent} />
          {cellEditable && (
            <Tooltip title={cellTooltipTitle} placement="top">
              <IconButton
                css={{ padding: 0, marginLeft: 5 }}
                onClick={() => setEditMode(true)}
              >
                <SettingsIcon css={{ width: 18, height: 18 }} />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
    </Box>
  );
};

RateCell.propTypes = {
  cellType: PropTypes.oneOf(Object.values(CELL_TYPES)).isRequired,
  rate: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RateCell);
