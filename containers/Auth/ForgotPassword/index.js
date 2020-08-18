
import { useState, memo } from 'react';
import Typography from '@material-ui/core/Typography';

import PageWrapper, { authPageStyles } from 'hoc/PagesWrapper';
import LinqLink from 'components/LinqLink';
import ContainedButton from 'components/Buttons/ContainedButton';
import OutlinedTextField from 'components/OutlinedTextField';
import MESSAGE from 'constants/message'
import PAGES from 'constants/links/pages';
import { useForm } from 'utils/hooks.js';
import { checkEmailValidation } from 'utils/validate';

const ForgotPassword = () => {
  const classes = authPageStyles();
  const [showForgotPart, setShowForgotPart] = useState(true);

  const submitCallback = () => {
    if (!checkEmailValidation(inputs.email)) {
      alert(MESSAGE.VALIDATION_FORM_ERROR.replace('FIELD', 'Email'));
      return;
    }
  };

  const { inputs, inputChangeHandler, submitHandler } = useForm(submitCallback);

  const forgotPasswordRender = () => {
    return (
      <>
        <OutlinedTextField
          name='email'
          placeholder='Email'
          value={inputs.email || ''}
          onChange={inputChangeHandler}
          className={classes.input}
        />
        <div className={classes.actionContainer}>
          <ContainedButton
            type='submit'
            color='primary'
            className={classes.button}
          >
            Forgot Password
          </ContainedButton>
          <LinqLink
            className={classes.forgotPassword}
            color='primary'
            variant='body1'
            underline='always'
            href={PAGES.SIGN_IN.url}
          >
            Sign In?
          </LinqLink>
        </div>
      </>
    )
  }

  const successRender = () => {
    return (
      <div className={classes.actionContainer}>
        <Typography
          variant='h5'
          className={classes.title}>
          Thank you
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          className={classes.description}
        >
          We sent you an email with the reset link. <br />
          Simply click on the link to reset your password.
        </Typography>
        <LinqLink
          className={classes.forgotPassword}
          color='primary'
          variant='body1'
          underline='always'
          href={PAGES.SIGN_IN.url}
        >
          Sign In?
        </LinqLink>
      </div>
    )
  }

  return (
    <PageWrapper>
      <form
        onSubmit={submitHandler}
        className={classes.form}
      >
        {
          showForgotPart
            ? forgotPasswordRender()
            : successRender()
        }
      </form>
    </PageWrapper>
  );
};

export default memo(ForgotPassword);
