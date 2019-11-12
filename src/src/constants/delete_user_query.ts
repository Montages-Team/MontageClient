import gql from 'graphql-tag';

export const UserDeleteMutation = gql`
mutation deleteUser($userName: String!) {
  deleteUser(username: $userName){
    ok
  }
}`;
