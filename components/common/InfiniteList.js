import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import Box from '@material-ui/core/Box';
import { debounce } from 'lodash';

const SCROLL_THROTTLE_DELAY = 200; // throttling event in milliseconds
const SCROLL_THRESHOLD = 50; // threshold in pixels from bottom
const isBottomOfWindow = el =>
  el.getBoundingClientRect().bottom <= window.innerHeight;

export default class InfiniteList extends Component {
  static propTypes = {
    scrollEnabled: PropTypes.bool,
    isFixedHeight: PropTypes.bool,
    items: PropTypes.array,
    hasNextPage: PropTypes.bool,
    isNextPageLoading: PropTypes.bool,
    resetList: PropTypes.func,
    loadNextPage: PropTypes.func,
    renderRow: PropTypes.func,
    renderLoading: PropTypes.func,
    scrollResetter: PropTypes.any, // change this value in order to reset scroll
    scrollThreshold: PropTypes.number,
    scrollThrottle: PropTypes.number
  };

  static defaultProps = {
    scrollEnabled: true,
    isFixedHeight: true,
    resetList: () => null,
    renderLoading: () => null,
    scrollThreshold: SCROLL_THRESHOLD,
    scrollThrottle: SCROLL_THROTTLE_DELAY
  };

  containerRef = null;

  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    const { isFixedHeight } = this.props;

    if (!isFixedHeight) {
      document.addEventListener('scroll', this.trackWindowScrolling);
    }
  }

  componentDidUpdate({
    scrollEnabled: prevScrollEnabled,
    scrollResetter: prevScrollResetter
  }) {
    const { scrollEnabled, resetList, scrollResetter } = this.props;

    if (!prevScrollEnabled && scrollEnabled) {
      this.loadNextPage();
    } else if (prevScrollEnabled && !scrollEnabled) {
      resetList();
    }

    if (prevScrollResetter !== scrollResetter && this.containerRef) {
      this.containerRef.current.scrollTop = 0;
    }
  }

  componentWillUnmount() {
    const { isFixedHeight } = this.props;

    if (!isFixedHeight) {
      document.removeEventListener('scroll', this.trackWindowScrolling);
    }
  }

  loadNextPage = debounce(() => {
    const { isNextPageLoading, hasNextPage } = this.props;

    if (!isNextPageLoading && hasNextPage) {
      this.props.loadNextPage();
    }
  }, this.props.scrollThrottle);

  checkBottom = ({ scrollHeight, scrollTop, clientHeight }) => {
    const { scrollThreshold } = this.props;
    const isBottom = scrollHeight - scrollTop - scrollThreshold <= clientHeight;

    if (isBottom) {
      this.loadNextPage();
    }
  };

  handleScroll = e => {
    const { scrollEnabled, isFixedHeight } = this.props;

    if (!scrollEnabled || !isFixedHeight) {
      return null;
    }

    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;

    return this.checkBottom({ scrollHeight, scrollTop, clientHeight });
  };

  trackWindowScrolling = () => {
    const { scrollEnabled } = this.props;

    if (scrollEnabled) {
      const { current: container } = this.containerRef;

      if (isBottomOfWindow(container)) {
        this.loadNextPage();
      }
    }
  };

  render() {
    const {
      items,
      renderRow,
      isNextPageLoading,
      renderLoading,
      ...rest
    } = this.props;
    const restProps = omit(rest, [
      'scrollEnabled',
      'isFixedHeight',
      'hasNextPage',
      'loadNextPage',
      'resetList',
      'scrollResetter',
      'scrollThreshold',
      'scrollThrottle'
    ]);

    return (
      <Box ref={this.containerRef} onScroll={this.handleScroll} {...restProps}>
        {items.map((item, index) => renderRow({ item, index }))}
        {isNextPageLoading && renderLoading()}
      </Box>
    );
  }
}
