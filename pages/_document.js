
import { Fragment } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

import theme from '../styles/theme.js';
import globalStyles from '../styles/global';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link rel='preload' href='/assets/fonts/chaloops.woff2' as='font'></link>
          <link rel='preload' href='/assets/fonts/verdanas.woff2' as='font'></link>
          <link
            rel='stylesheet'
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons' />
          <style jsx global>
            {globalStyles}
          </style>
        </Head>
        <noscript>Please enable Javascript to continue using this application.</noscript>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <Fragment key='styles'>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </Fragment>
    ]
  };
};

export default MyDocument;