import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from '@common/components/common';
import { generateMonthSelectOptions } from '@common/components/properties/PropertyInventory/helpers';

const MONTHS = generateMonthSelectOptions();

const ItemHead = ({
  startDate,
  propertyName,
  roomTypeId,
  roomTypes,
  onBack,
  onSelectedMonthChange,
  onSelectedRoomTypeChange
}) => {
  const selectedRoomType = roomTypes.find(item => item.id === roomTypeId);
  const selectedName = get(selectedRoomType, 'name', '');
  const modalTitle = `Edit Room Descriptions for ${propertyName}'s ${selectedName}`; // eslint-disable-line

  return (
    <Box height={1} display="flex" flexDirection="column">
      <Box
        bgcolor="#4a4a4a"
        height={60}
        px={2}
        display="flex"
        alignItems="center"
      >
        <Box color="white">
          <Typography variant="body1" children="View:" />
        </Box>
        <Box ml={2}>
          <TextField
            id="month-selector"
            select
            value={startDate.format('YYYY-MM-DD')}
            onChange={onSelectedMonthChange}
            InputProps={{ style: { color: 'white' } }}
          >
            {MONTHS.map(month => (
              <MenuItem key={month.label} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      <Box flex={1} borderRight={1} borderColor="lightGrey">
        <Box p={2}>
          <Button onClick={onBack} variant="text">
            <ArrowBackIcon />
            <Box ml={2}>
              <Typography variant="body1">Back to all rooms</Typography>
            </Box>
          </Button>
        </Box>
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
      </Box>
    </Box>
  );
};

ItemHead.propTypes = {
  startDate: PropTypes.object.isRequired,
  propertyName: PropTypes.string.isRequired,
  roomTypeId: PropTypes.number.isRequired,
  roomTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  photoUploadDisabled: PropTypes.bool,
  onBack: PropTypes.func.isRequired,
  saveRoomType: PropTypes.func.isRequired,
  onSelectedMonthChange: PropTypes.func.isRequired,
  onSelectedRoomTypeChange: PropTypes.func.isRequired
};

export default ItemHead;
