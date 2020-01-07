import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Button } from '@common/components/common';

GoLiveBanner.propTypes = {
  onGoLive: PropTypes.func
};

function GoLiveBanner({ onGoLive }) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const handleGoLive = async () => {
    setLoading(true);
    try {
      await onGoLive();
    } catch (e) {
      enqueueSnackbar(e.message || 'There was problem requesting to go live');
    }
    setLoading(false);
  };

  return (
    <Box my={1} width={1}>
      <Container width="lg">
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h3">
            Ready to make&nbsp;<Link>Your Profile Page</Link>&nbsp;live on
            Benny?
          </Typography>
          <Button loading={loading} onClick={handleGoLive} ml={3}>
            Yes, Go Live
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default GoLiveBanner;
