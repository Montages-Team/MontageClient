import gql from 'graphql-tag';

export const createNewUserMutation: any = gql`
      mutation{
        createUser{
          user{
            id
            username
            identifierId
            displayName
            profileImgUrl
          }
        }
      }`;
