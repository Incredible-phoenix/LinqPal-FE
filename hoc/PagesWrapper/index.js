
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('xs')]: {
      padding: 0
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '90%',
    height: '100vh',
  },
  lazyImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    objectFit: 'cover',
    objectPosition: 'left'
  },
  mainlayout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(40),
      margin: 0
    },
    [theme.breakpoints.down(360)]: {
      width: theme.spacing(33)
    },
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.background.default,
    width: theme.spacing(45),
    position: 'absolute'
  }
}));

const authPageStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(4),
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4, 2)
    }
  },
  input: {
    margin: theme.spacing(2, 0, 1)
  },
  check: {
    width: theme.spacing(2.5)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  description: {
    textAlign: 'center'
  },
  actionContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2)
  },
  forgotPassword: {
    padding: theme.spacing(1.5, 0),
    fontFamily: 'ChaloopsW00-Reg',
    letterSpacing: theme.spacing(0.2)
  },

}));

const PageWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth='sm'>
      <LazyLoadImage
        height={'100%'}
        width={'100%'}
        className={classes.lazyImage}
        effect="blur"
        src={'/assets/images/background.webp'} >
      </LazyLoadImage>
      <div className={classes.mainlayout}>
        {children}
      </div>
    </Container>
  );
};

export { authPageStyles };
export default PageWrapper;
