
import gql from 'graphql-tag';

const CURRENT_USER = gql`
  {
    currentUser {
      _id
      email
      userName
      phoneNumber
      address
      thumbnail
    }
  }
`;
const USERS = gql`
  {
    users {
      _id
      email
      password
      userName
      phoneNumber
      address
    }
  }
`;

const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`;

export {
  IS_LOGGED_IN,
  USERS,
  CURRENT_USER
};
