import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import { ArrowLeft, ArrowRight } from '@common/components/common/Navigation';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

export default class Carousel extends Component {
  static propTypes = {
    displayCounts: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.node).isRequired
  };

  containerRef = null;

  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
    this.state = {
      displayCounts: props.displayCounts,
      startIndex: 0
    };
  }

  componentDidMount() {
    this.setDisplayCounts();
  }

  handleChangeIndex = startIndex => {
    this.setState({ startIndex });
  };

  setDisplayCounts = () => {
    const { current: container } = this.containerRef;
    const { displayCounts } = this.props;
    let counts = null;

    if (displayCounts) {
      counts = displayCounts;
    } else if (container.clientWidth <= 300) {
      counts = 1;
    } else if (container.clientWidth <= 700) {
      counts = 2;
    } else if (container.clientWidth <= 1200) {
      counts = 3;
    } else {
      counts = 4;
    }

    this.setState({ displayCounts: counts });
  };

  onPrevClick = () => {
    const { startIndex } = this.state;
    this.setState({ startIndex: startIndex - 1 });
  };

  onNextClick = () => {
    const { startIndex } = this.state;
    this.setState({
      startIndex: startIndex + 1
    });
  };

  slideRenderer = params => {
    const { items } = this.props;
    const { index, key } = params;
    const { displayCounts } = this.state;
    const size = items.length;
    const maxSize = Math.ceil(size / displayCounts);
    const startIndex = mod(index, maxSize);
    const oneItemWidth = `${100 / displayCounts}%`;
    const displayItems = items
      .slice(startIndex * displayCounts, (startIndex + 1) * displayCounts)
      .map((slicedItem, i) => (
        <Box
          key={`item_${index}_${i}`}
          flex={`0 0 ${oneItemWidth}`}
          children={slicedItem}
        />
      ));

    return (
      <Box flex={1} display="flex" key={key}>
        {displayItems}
      </Box>
    );
  };

  render() {
    const { items, ...rest } = this.props;
    const { displayCounts, startIndex } = this.state;

    const prevButtonHidden = displayCounts >= items.length || startIndex === 0;
    const nextButtonHidden =
      displayCounts >= items.length ||
      startIndex === Math.ceil(items.length / displayCounts) - 1;
    const swiper = (
      <VirtualizeSwipeableViews
        slideRenderer={this.slideRenderer}
        index={startIndex}
        onChangeIndex={this.handleChangeIndex}
      />
    );
    const swiperWrapper =
      displayCounts === 1 ? <Box flex={1}>{swiper}</Box> : swiper;

    return (
      <Box
        width={1}
        ref={this.containerRef}
        display="flex"
        alignItems="center"
        {...omit(rest, ['displayCounts'])}
      >
        <Box width={0}>
          {!prevButtonHidden && <ArrowLeft onClick={this.onPrevClick} />}
        </Box>
        {swiperWrapper}
        <Box width={0}>
          {!nextButtonHidden && <ArrowRight onClick={this.onNextClick} />}
        </Box>
      </Box>
    );
  }
}
