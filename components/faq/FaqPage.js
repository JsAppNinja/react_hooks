import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Page from '@common/components/common/Page';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export default class FaqPage extends Component {
  static propTypes = {
    content: PropTypes.array,
    header: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  selectNav(index) {
    this.setState({
      current: index
    });
  }

  render() {
    const { current } = this.state;
    const { header, content } = this.props;

    const nav = content.map((c, i) => {
      return (
        <ListItem
          key={c.name}
          selected={current === i}
          component="a"
          button
          onClick={() => {
            this.selectNav(i);
          }}
        >
          {c.label}
        </ListItem>
      );
    });

    const body = content[current].body;
    const bodyHeader = content[current].label;

    return (
      <Page title="FAQ" namespace="agent" height="100%">
        <Grid
          container
          spacing={2}
          position="absolute"
          top="0"
          right="0"
          left="0"
          bottom="0"
        >
          <Grid item xs={12}>
            <Typography variant="h5" align="left">
              {header}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <List component="nav" aria-label="FAQ navigation">
              {nav}
            </List>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6" align="left">
              {bodyHeader}
            </Typography>
            {body}
          </Grid>
        </Grid>
      </Page>
    );
  }
}
