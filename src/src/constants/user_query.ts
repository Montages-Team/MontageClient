import gql from 'graphql-tag';

export const userQuery: any = gql`
query getProfileUser($name: String){
  user(username: $name){
    id
    username
    email
    profileImage
  }
}`;
