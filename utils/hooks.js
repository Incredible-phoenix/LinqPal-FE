
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
import { updateGlobalApolloClient } from 'lib/apollo';
import { IS_LOGGED_IN } from 'api/user/queries';


const useForm = callback => {
  const [inputs, setInputs] = useState({});
  const submitHandler = event => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const inputChangeHandler = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  return {
    submitHandler,
    inputChangeHandler,
    inputs
  };
};

const useAuth = () => {
  const client = useApolloClient();
  const { writeCache, resetCache } = useCache();
  const { data: { isLoggedIn = false } = {} } = useQuery(IS_LOGGED_IN);
  const logOutHandler = useCallback(() => {
    writeCache({ isLoggedIn: false })
    resetCache();
    localStorage.clear();
  }, [writeCache, resetCache]);

  const setLoginToken = useCallback((token) => {
    localStorage.setItem('token', token);
    // client.writeData({ data: { isLoggedIn: true } });
    updateGlobalApolloClient();
  }, []);

  return {
    isLoggedIn,
    logOutHandler,
    setLoginToken,
    useCache
  }
};

const useCache = () => {
  const client = useApolloClient();

  const writeCache = useCallback(data => {
    client.writeData({ data });
  }, []);

  const resetCache = useCallback(() => {
    client.cache.reset();
  }, []);

  return {
    resetCache,
    writeCache
  }
};

export {
  useAuth,
  useForm
};
