
import { useAuth } from 'utils/hooks.js';

const withIfAuth = WrappedComponent => {
  const WithIfAuth = props => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn && <WrappedComponent {...props} />;
  };

  return WithIfAuth;
};

export default withIfAuth;