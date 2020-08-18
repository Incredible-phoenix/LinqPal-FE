
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  fontStyle: {
    fontFamily: 'ChaloopsW00-Reg',
    fontSize: theme.spacing(4)
  }
}));

const BoardHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.fontStyle} variant='body1'>Your Information</Typography>
    </div>
  );
};

export default BoardHeader;
