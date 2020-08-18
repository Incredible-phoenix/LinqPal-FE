
import gql from 'graphql-tag';

const LOGIN = gql`
  mutation Login($userName: String!, $password: String!, $remember: Boolean!) {
    login(userName: $userName, password: $password, remember: $remember) {
      token
      user{
        _id
        email
      }
    }
  }
`;

export {
  LOGIN
};
