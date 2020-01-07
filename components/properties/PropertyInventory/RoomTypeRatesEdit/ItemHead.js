import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import EditForm from './EditForm';

const ItemHead = ({
  monthStartDate,
  roomTypeId,
  roomTypes,
  onSelectedDateChange,
  onSelectedRoomTypeChange,
  onSubmit
}) => (
  <Box height={1} display="flex" flexDirection="column">
    <Box
      bgcolor="#4a4a4a"
      height={60}
      px={2}
      display="flex"
      alignItems="center"
    />
    <Box flex={1} borderRight={1} borderColor="lightGrey">
      <Box p={2}>
        <TextField
          id="room-type-selector"
          label="Room Type"
          select
          value={roomTypeId}
          variant="outlined"
          onChange={onSelectedRoomTypeChange}
          css={{ width: '100%' }}
        >
          {roomTypes.map(({ id, name, roomCode }) => (
            <MenuItem key={id} value={id}>
              {roomCode ? `${name} (${roomCode})` : `${name}`}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box px={2}>
        <EditForm
          monthStartDate={monthStartDate}
          onSelectedDateChange={onSelectedDateChange}
          onSubmit={onSubmit}
        />
      </Box>
    </Box>
  </Box>
);

ItemHead.propTypes = {
  monthStartDate: PropTypes.object.isRequired,
  roomTypeId: PropTypes.number.isRequired,
  roomTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedDateChange: PropTypes.func.isRequired,
  onSelectedRoomTypeChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ItemHead;
