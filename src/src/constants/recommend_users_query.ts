import gql from 'graphql-tag';

export const recommendUsersQuery: any = gql`
query recommendUsers($userName: String){
  recommendUsers(username: $userName){
    id
    username
    displayName
    profileImgUrl
  }
}`;
