
import React, { useEffect, useCallback } from 'react';
import 'typeface-roboto';
import { useRouter } from 'next/router'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { withApollo } from 'lib/apollo';

import PAGES from 'constants/links/pages';
import commonConstants from 'constants/common';
import { pageRoutes, authRoutes } from 'constants/links/routes';
import { AppContext } from 'contexts';
import theme from 'styles/theme';
import { useAuth } from 'utils/hooks';

const MyApp = ({ Component, pageProps }) => {

  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    document.title = commonConstants.TITLE;
    if (isLoggedIn) {
      if (authRoutes.includes(router.pathname)) {
        router.push(PAGES.HOME.url)
      }
    } else {
      router.push(PAGES.SIGN_IN.url)
    }
  }, [isLoggedIn]);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider>
        <CssBaseline />
        <Component {...pageProps} />
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default withApollo(MyApp);