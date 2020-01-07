import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const ListHead = ({ roomTypes, onRoomTypeClick }) => (
  <Box display="flex" flexDirection="column">
    <Box bgcolor="#4a4a4a" height={60} />
    {roomTypes.map(roomType => (
      <Box component={Paper} key={roomType.id} mb={1}>
        <Box
          height={120}
          display="flex"
          flexDirection="column"
          p={2}
          borderRight={1}
          borderColor="lightGrey"
        >
          <Box
            component={Typography}
            variant="h5"
            children={roomType.name}
            maxWidth={1}
            css={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          />
          <Typography
            component="h5"
            variant="h6"
            children={roomType.roomCode ? `(${roomType.roomCode})` : ''}
          />
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            flex={1}
          >
            <IconButton
              onClick={() => onRoomTypeClick(roomType.id)}
              css={{ padding: 0 }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    ))}
  </Box>
);

ListHead.propTypes = {
  roomTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRoomTypeClick: PropTypes.func.isRequired
};

export default ListHead;
