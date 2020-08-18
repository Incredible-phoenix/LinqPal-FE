
import { makeStyles } from '@material-ui/core/styles';

import BoardHeader from './BoardHeader';
import BoardBody from './BoardBody';
import BoardFooter from './BoardFooter';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  }
}));

const CardBoard = ({ tableData }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BoardHeader />
      <BoardBody tableData={tableData} />
      <BoardFooter />
    </div>
  );
};

export default CardBoard;