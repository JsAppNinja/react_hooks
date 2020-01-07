import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Icon, Divider } from '@common/components/common';
import InfiniteTopRecommendationList from './InfiniteTopRecommendationList';

const TopRecommendationList = ({
  cityId,
  startDate,
  endDate,
  numberOfAdults,
  numberOfKids,
  ...rest
}) => {
  const [hasNextPage, setHasNextPage] = useState(false);
  const [viewMoreClicked, setViewMoreClicked] = useState(false);
  const toggleMore = () => setViewMoreClicked(!viewMoreClicked);

  return (
    <Card elevation={0} {...rest}>
      <Typography variant="h2">Top Hotels</Typography>
      <Divider />
      <InfiniteTopRecommendationList
        scrollEnabled={viewMoreClicked}
        cityId={cityId}
        startDate={startDate}
        endDate={endDate}
        numberOfAdults={numberOfAdults}
        numberOfKids={numberOfKids}
        setHasNextPage={setHasNextPage}
      />
      <Divider />
      <CardActions>
        <Box width={1} display="flex" justifyContent="center">
          <ButtonBase
            disabled={!viewMoreClicked && !hasNextPage}
            onClick={toggleMore}
          >
            <Icon icon={viewMoreClicked ? 'expand_less' : 'expand_more'} />
          </ButtonBase>
        </Box>
      </CardActions>
    </Card>
  );
};

TopRecommendationList.propTypes = {
  cityId: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  numberOfAdults: PropTypes.number.isRequired,
  numberOfKids: PropTypes.number.isRequired,
  endDate: PropTypes.string.isRequired
};

export default TopRecommendationList;
