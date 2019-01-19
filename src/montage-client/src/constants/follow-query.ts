import gql from 'graphql-tag';

export const CreateRelation = gql`
  createRelation(followingUserId: int, followedUserId: int){
          relation{
            following{
              id
              username
              asAtsign
            }
            followed{
              id
              username
              asAtsign
            }
          }
          ok
        }
    `;
