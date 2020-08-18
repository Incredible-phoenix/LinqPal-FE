
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import CardBoard from 'components/CardBoard';

import ContainedButton from 'components/Buttons/ContainedButton';
import { CURRENT_USER } from 'api/user/queries';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2)
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: theme.custom.layout.topAreaHeight,
    height: `calc(100vh - ${theme.custom.layout.topAreaHeight + theme.custom.layout.footerAreaHeight}px)`
  }
}));

const LandingPage = () => {
  const classes = useStyles();
  const { data: { currentUser = {} } = {} } = useQuery(CURRENT_USER);

  return (
    <div className={classes.root}>
      <CardBoard tableData={currentUser[0]} />
    </div>
  );
};

export default LandingPage;
