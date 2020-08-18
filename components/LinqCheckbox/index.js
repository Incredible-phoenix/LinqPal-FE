
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  checkbox: {
    '& svg': {
      width: theme.spacing(3),
      height: theme.spacing(3)
    }
  }
}));

const PronetCheckbox = ({ label, value = false, onChange = () => { } }) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <Checkbox
          className={classes.checkbox}
          color='primary'
          checked={value}
          inputProps={{
            'aria-label': 'terms of service',
          }}
          onChange={onChange} />
      }
      label={label} />
  );
};

export default PronetCheckbox;
