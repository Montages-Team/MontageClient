import gql from 'graphql-tag';

export const userQuery: any = gql`
query user($userName: String){
  user(username: $userName){
    id
    username
    identifierId
    displayName
    profileImgUrl
  }
}`;
