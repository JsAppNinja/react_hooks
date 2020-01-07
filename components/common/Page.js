import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { omit } from 'lodash';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const titleFromNamespace = namespace => {
  switch (namespace) {
    case 'admin':
      return 'Admin';
    case 'agent':
      return 'Agents';
    case 'hotel':
      return 'Hotels';
    case 'user':
    default:
      return '';
  }
};

/**
 * Page wrapper component.
 * Configures title and centers elements using flexbox.
 * Default page title is set to `Benny`, and will be used if nothing
 * is provided.
 * If a title exists, `%s | Benny` template will be used.
 * If `namespace` prop is provided, it will be formatted & appended to the title
 */
const Page = props => {
  const {
    children,
    title,
    heading,
    subHeading,
    namespace,
    headingProps,
    subHeadingProps,
    containerProps,
    flexParams: { align, justify, direction },
    ...rest
  } = props;
  const namespacedTitle = titleFromNamespace(namespace);
  const restProps = omit(rest, [
    'client',
    'history',
    'location',
    'match',
    'mutate',
    'staticContext'
  ]);

  return (
    <Box
      width={1}
      display="flex"
      alignItems={align}
      flexDirection={direction}
      justifyContent={justify}
      {...restProps}
    >
      <Container width="lg" {...containerProps}>
        <Helmet
          defaultTitle="Benny"
          titleTemplate={`%s | Benny ${namespacedTitle}`}
        >
          <title children={title} />
        </Helmet>
        {heading && (
          <Typography variant="h1" children={heading} {...headingProps} />
        )}
        {subHeading && (
          <Typography variant="h2" children={subHeading} {...subHeadingProps} />
        )}
        {children}
      </Container>
    </Box>
  );
};

Page.defaultProps = {
  title: '',
  namespace: 'user',
  flexParams: {
    align: 'flex-start',
    justify: 'flex-start',
    direction: 'column'
  }
};

/**
 * @param {String} title   The page title
 * @param {String} heading    H1 header
 * @param {String} subHeading  H2 sub-header
 * @param {Array} namespace  String setting the title namespace
 * @param {shape} flexParams Object defining flexbox settings
 */
Page.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  namespace: PropTypes.oneOf(['user', 'hotel', 'admin', 'agent']),
  headingProps: PropTypes.object,
  subHeadingProps: PropTypes.object,
  containerProps: PropTypes.object,
  flexParams: PropTypes.shape({
    align: PropTypes.string,
    justify: PropTypes.string,
    direction: PropTypes.string
  }),
  children: PropTypes.node
};

export default withRouter(Page);
