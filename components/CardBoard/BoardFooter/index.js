
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useRouter } from 'next/router';

import { useAuth } from 'utils/hooks';
import Link from 'constants/links/pages';
import ContainedButton from 'components/Buttons/ContainedButton';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down(740)]: {
      width: `calc(100vw - ${theme.spacing(10)}px)`
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: theme.spacing(10),
    width: theme.spacing(85),
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.background.main
  },
  addButton: {
    fontFamily: 'ChaloopsW00-Reg',
    letterSpacing: theme.spacing(0.2),
    fontSize: theme.spacing(2.5),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(20.5),
    height: theme.spacing(6.5)
  }
}));

const BoardFooter = () => {
  const classes = useStyles();
  const router = useRouter();
  const { logOutHandler } = useAuth();
  const logoutHandler = () => {
    logOutHandler();
    router.push(Link.SIGN_IN.url);
  }
  return (
    <Card className={classes.root}>
      <ContainedButton className={classes.addButton} onClick={logoutHandler}> Log out! </ContainedButton>
    </Card>
  );
};

export default BoardFooter;