import React from 'react';
import { styled } from '@material-ui/styles';
import { colors } from '@constants/style';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

export const ThumbnailImage = styled(CardMedia)({
  paddingBottom: '100%'
});

export const ThumbnailContent = styled(CardContent)({
  border: `2px solid ${colors.yellow}`,
  width: '90%',
  position: 'relative',
  left: '5%',
  top: '-30px',
  background: colors.purple
});

export const AttributeList = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around'
});

export const ThumbnailName = styled(CardActionArea)({
  display: 'block',
  minHeight: '3rem',
  marginTop: '0.5rem'
});
