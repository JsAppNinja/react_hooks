import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { omit, get } from 'lodash';
import { If, Carousel } from '@common/components/common';
import ThumbnailRecommendationCard from './ThumbnailRecommendationCard';
import RecommendationCard from './RecommendationCard';

const defaultImage = 'https://source.unsplash.com/random/500x400';

const ThumbnailRecommendationList = ({ recommendations, agent, ...rest }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const onSelect = index => setSelectedIndex(index);
  const onClose = () => setSelectedIndex(null);

  const carouselItems = recommendations.map((recommendation, index) => (
    <Box key={recommendation.id} p={2}>
      <ThumbnailRecommendationCard
        {...omit(recommendation, ['id', 'description'])}
        image={get(
          recommendation,
          'property.images[0].publicUrl',
          defaultImage
        )}
        agent={agent}
        onClick={() => onSelect(index)}
      />
    </Box>
  ));

  return (
    <Box {...rest}>
      <If
        condition={selectedIndex !== null}
        render={() => (
          <RecommendationCard
            {...omit(recommendations[selectedIndex], ['id'])}
            image={get(
              recommendations[selectedIndex],
              'property.images[0].publicUrl',
              defaultImage
            )}
            agent={agent}
            target={'_blank'}
            mb={3}
            onClose={onClose}
          />
        )}
        otherwise={() => <Carousel displayCounts={3} items={carouselItems} />}
      />
    </Box>
  );
};

ThumbnailRecommendationList.propTypes = {
  agent: PropTypes.object,
  recommendations: PropTypes.arrayOf(PropTypes.object)
};

export default ThumbnailRecommendationList;
