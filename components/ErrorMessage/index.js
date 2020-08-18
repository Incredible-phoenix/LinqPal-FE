
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    color :'#ee2841'
  }
}));

const ErrorMessage = ({ message }) => {
  const classes = useStyles();

  return (
    <Typography
      variant='body2'
      color='secondary'
      className={classes.root}
    >
      {message}
    </Typography>
  );
}

export default ErrorMessage;