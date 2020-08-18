
import { useState, memo } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';

import { LOGIN } from 'api/user/mutations';
import PageWrapper, { authPageStyles } from 'hoc/PagesWrapper';
import LinqLink from 'components/LinqLink';
import LinqCheckbox from 'components/LinqCheckbox';
import ContainedButton from 'components/Buttons/ContainedButton';
import OutlinedTextField from 'components/OutlinedTextField';
import ErrorMessage from 'components/ErrorMessage';
import MESSAGE from 'constants/message'
import commonConstants from 'constants/common'
import PAGES from 'constants/links/pages';
import { useForm, useAuth } from 'utils/hooks.js';
import { checkEmailValidation } from 'utils/validate';
import { isEmpty } from 'utils/utility';

const SignIn = () => {
  const router = useRouter();
  const classes = authPageStyles();

  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setLoginToken } = useAuth();

  const submitCallback = () => {
    login({
      variables: {
        userName: inputs.userName,
        password: inputs.password,
        remember
      }
    });
    if (!inputs.userName) {
      setErrorMessage(MESSAGE.VALIDATION_FORM_ERROR.replace('FIELD', 'Username'));
      return;
    }

    if (checkEmailValidation(inputs.userName)) {
      alert(MESSAGE.AUTH_USERNAME_EMAIL_ERROR);
      return;
    }

    if (!inputs.password) {
      setErrorMessage(MESSAGE.VALIDATION_FORM_ERROR.replace('FIELD', 'Password'));
      return;
    }
    login({
      variables: {
        userName: inputs.userName,
        password: inputs.password,
        remember
      }
    });
  };

  const { inputs, inputChangeHandler, submitHandler } = useForm(submitCallback);
  const [login, { loading }] = useMutation(
    LOGIN,
    {
      onCompleted({ login }) {
        const { token = '' } = login;
        setLoginToken(token);
        router.push(PAGES.HOME.url);
      },
      onError({ graphQLErrors }) {
        if (!isEmpty(graphQLErrors)) {
          const { message = '', extensions: { code = '' } } = graphQLErrors[0];
          if (commonConstants.SUBSCRIPTION_EXPIRED_CODE === code) {
            alert(message);
          } else {
            alert(message);
          }
        }
      }
    }
  );

  return (
    <PageWrapper>
      <form
        onSubmit={submitHandler}
        className={classes.form}
      >
        <OutlinedTextField
          name='userName'
          placeholder='Username'
          value={inputs.userName || ''}
          onChange={inputChangeHandler}
          className={classes.input}
        />
        <OutlinedTextField
          name='password'
          type='password'
          placeholder='Password'
          value={inputs.password || ''}
          onChange={inputChangeHandler}
          className={classes.input}
        />
        <LinqCheckbox
          value={remember}
          onChange={(event) => { setRemember(event.target.checked) }}
          className={classes.check}
          label={<Typography color='textSecondary'>Remember me</Typography>}
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
            SIGN IN
          </ContainedButton>
          <LinqLink
            className={classes.forgotPassword}
            color='primary'
            variant='body1'
            underline='always'
            href={PAGES.FORGOT_PASSWORD.url}
          >
            Forgot password?
          </LinqLink>
        </div>
      </form>
    </PageWrapper>
  );
};

export default memo(SignIn);
