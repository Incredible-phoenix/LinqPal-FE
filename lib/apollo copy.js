
import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities'
import fetch from 'isomorphic-unfetch';

import { BACKEND_GRAPHQL_HTTP_URL } from 'config';
import messageConstants from 'constants/message';
import commonConstants from 'constants/common';
import PAGES from 'constants/links/pages';

let globalApolloClient = null;
/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient());

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }} />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState
      };
    };
  }

  return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState);
  }

  return globalApolloClient;
}

export function updateGlobalApolloClient() {
  globalApolloClient = createApolloClient();
}
/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */

function createApolloClient(initialState = {}) {
  const cache = new InMemoryCache({ addTypename: false }).restore(initialState || {});
  const token = typeof window === 'undefined' ? '' : localStorage.token;
  let tokenExpiredCount = 0;
  let networkErrorCount = 0;

  cache.writeData({
    data: {
      isLoggedIn: !!token
    }
  })

  const errorLink = onError(({ networkError, graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      const { message = '', extensions: { code = '' } } = graphQLErrors[0];
      if (commonConstants.TOKEN_EXPIRED_CODE === code) {
        tokenExpiredCount++;
        if (tokenExpiredCount === 1) {
          localStorage.clear();
          alert(message.replace('Context creation failed:', ''))
          updateGlobalApolloClient();
          window.location.replace(PAGES.SIGN_IN.url);
        }
      }
    } else if (networkError) {
      networkErrorCount++;
      if (networkErrorCount === 1) {
        alert(messageConstants.NETWORK_ERROR);
        setTimeout(() => {
          networkErrorCount = 0;
        }, 5000);
      }
      return forward(operation)
    }
  });

  const authLink = new HttpLink({
    uri: BACKEND_GRAPHQL_HTTP_URL,
    headers: {
      authorization: token ? `Bearer ${token}` : null
    },
    credentials: 'same-origin',
    fetch
  });

  const httpLink = errorLink.concat(authLink);
  const link = process.browser ? split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    httpLink,
  ) : httpLink;

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link,
    cache,
    typeDefs: {},
    resolvers: {}
  });
}