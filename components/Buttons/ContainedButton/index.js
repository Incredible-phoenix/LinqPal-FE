
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: () => {
    return ({
      margin: theme.spacing(3 / 8),
      boxShadow: 'none',
      textTransform: 'none',
      backgroundColor: theme.custom.palette.darkRed,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: theme.custom.palette.hover
      },
      // TODO: handle color='error'
      // backgroundColor: props.color ? theme.palette[props.color].main : theme.palette.primary.main
    })
  }
}));

const ContainedButton = ({ className, type, color, variant, children, ...rest }) => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(className, classes.root)}
      color={color}
      variant={variant || 'contained'}
      type={type}
      {...rest}>
      {children}
    </Button>
  );
};

export default ContainedButton;
