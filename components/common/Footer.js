import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { styled } from '@material-ui/styles';
import { Icon } from '@common/components/common';

import { colors, fonts, backupFontStack } from '@constants/style';

const SocialIconLink = styled('a')({
  textDecoration: 'none',
  borderRadius: '30px',
  width: '30px',
  height: '30px',
  display: 'flex',
  position: 'absolute',
  top: '-7px',
  right: '30px',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.yellow
});

const StyledFooter = styled(Box)({
  borderTop: `2px solid ${colors.yellow}`,
  paddingTop: '2rem'
});

const StyledListSubheader = styled(ListSubheader)({
  textTransform: 'uppercase',
  marginBottom: '10px',
  color: colors.yellow,
  fontWeight: '800',
  padding: '0',
  lineHeight: '1rem'
});

const VerticalPipe = props => (
  <Box variant="caption" display="inline" px={1} {...props}>
    &#124;
  </Box>
);

const FooterListItem = styled(ListItem)({
  padding: '0'
});

const BottomLink = styled(Link)({
  fontWeight: '400',
  fontFamily: `${fonts.caption}, ${backupFontStack.sans}`,
  paddingRight: '7px'
});

const FooterListItemText = ({ to, text }) => (
  <ListItemText
    disableTypography
    primary={
      <BottomLink variant="caption" href={to}>
        {text}
      </BottomLink>
    }
  />
);

FooterListItemText.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string
};

const bennyMenu = {
  About: process.env.APPLICATION_BASE_URL + '/about',
  Login: process.env.APPLICATION_BASE_URL + '/login',
  FAQ: process.env.APPLICATION_BASE_URL + '/faq'
};

const agentsMenu = {
  'Login Here': process.env.AGENT_APPLICATION_BASE_URL + '/login',
  'Apply Now': process.env.APPLICATION_BASE_URL + '/agent_application'
};

const hotelsMenu = {
  'Login Here': process.env.HOTEL_APPLICATION_BASE_URL + '/login',
  'Apply Now': process.env.APPLICATION_BASE_URL + '/hotel_application'
};

const year = new Date().getFullYear();

const Footer = () => (
  <StyledFooter>
    <Container>
      <Grid container direction="row" alignItems="stretch">
        <Grid item xs={2}>
          <List
            dense
            subheader={
              <StyledListSubheader>
                <Link href={process.env.APPLICATION_BASE_URL + '/'}>Benny</Link>
              </StyledListSubheader>
            }
          >
            {Object.keys(bennyMenu).map((text, index) => (
              <FooterListItem key={index} button>
                <FooterListItemText text={text} to={bennyMenu[text]} />
              </FooterListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={2}>
          <List
            subheader={
              <StyledListSubheader>
                <Link
                  href={process.env.APPLICATION_BASE_URL + '/agent_application'}
                >
                  Agents
                </Link>
              </StyledListSubheader>
            }
          >
            {Object.keys(agentsMenu).map((text, index) => (
              <FooterListItem key={index} button>
                <FooterListItemText text={text} to={agentsMenu[text]} />
              </FooterListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={2}>
          <List
            subheader={
              <StyledListSubheader>
                <Link
                  href={process.env.APPLICATION_BASE_URL + '/hotel_application'}
                >
                  Hotels
                </Link>
              </StyledListSubheader>
            }
          >
            {Object.keys(hotelsMenu).map((text, index) => (
              <FooterListItem key={index} button>
                <FooterListItemText text={text} to={hotelsMenu[text]} />
              </FooterListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Box position="relative">
            <StyledListSubheader>Check-In With Us</StyledListSubheader>
            <SocialIconLink href="https://instagram.com">
              <Icon icon="camera_alt" />
            </SocialIconLink>
            <Typography variant="body1">
              Get the inside scoop on the world’s best hotels straight to your
              inbox.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Typography variant="caption">&copy; Benny {year}</Typography>
        <VerticalPipe />
        <BottomLink
          variant="caption"
          to={process.env.APPLICATION_BASE_URL + '/terms_and_conditions'}
        >
          Terms & Conditions
        </BottomLink>
        <VerticalPipe />
        <BottomLink
          variant="caption"
          to={process.env.APPLICATION_BASE_URL + '/privacy_policy'}
        >
          Privacy Policy
        </BottomLink>
      </Box>
    </Container>
  </StyledFooter>
);

export default Footer;
