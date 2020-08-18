
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import LogoIcon from 'components/Icons/linqlogoIcon';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(16),
    height: theme.spacing(20),
    paddingLeft: theme.spacing(0),
  },
  avatarContainer: {
    cursor: 'pointer',
    display: 'flex',
    marginTop: theme.spacing(4),
    width: theme.spacing(16),
    height: theme.spacing(16),
    backgroundColor: theme.palette.background.main,
    margin: 'auto',
  }
}));

const LogoTitle = ({ title }) => {
  const classes = useStyles();

  return (
    <Avatar className={classes.avatarContainer}>
      <LogoIcon />
      <Typography variant='h4'>
        {title}
      </Typography>
    </Avatar>
  );
};

export default LogoTitle;
