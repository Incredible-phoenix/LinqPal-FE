
import { useState, memo } from 'react';
import { useRouter } from 'next/router';

import PageWrapper, { authPageStyles } from 'hoc/PagesWrapper';
import LinqLink from 'components/LinqLink';
import ContainedButton from 'components/Buttons/ContainedButton';
import OutlinedTextField from 'components/OutlinedTextField';
import ErrorMessage from 'components/ErrorMessage';
import MESSAGE from 'constants/message'
import PAGES from 'constants/links/pages';
import { useForm } from 'utils/hooks.js';

const ResetPassword = () => {
  const router = useRouter();
  const classes = authPageStyles();

  const [errorMessage, setErrorMessage] = useState('');

  const submitCallback = () => {
    if (!inputs.password) {
      setErrorMessage(MESSAGE.VALIDATION_FORM_ERROR.replace('FIELD', 'Password'));
      return;
    }

    if (inputs.password !== inputs.confirmPassword) {
      setErrorMessage(MESSAGE.VALIDATION_FORM_ERROR.replace('FIELD', 'Confirm Password'));
      return;
    }

    resetPassword({
      variables: {
        resetPasswordToken: router.query.token,
        password: inputs.password
      }
    });
  };

  const { inputs, inputChangeHandler, submitHandler } = useForm(submitCallback);
 
  return (
    <PageWrapper>
      <form
        onSubmit={submitHandler}
        className={classes.form}
      >
        <OutlinedTextField
          name='password'
          type='password'
          placeholder='Password'
          value={inputs.password || ''}
          onChange={inputChangeHandler}
          className={classes.input}
        />
        <OutlinedTextField
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          value={inputs.confirmPassword || ''}
          onChange={inputChangeHandler}
          className={classes.input}
        />
        {
          errorMessage &&
          <ErrorMessage message={errorMessage} />
        }
        <div className={classes.actionContainer}>
          <ContainedButton
            type='submit'
            color='primary'
            disabled={!!loading}
            className={classes.button}
          >
            Reset Password
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
      </form>
    </PageWrapper>
  );
};

export default memo(ResetPassword);
