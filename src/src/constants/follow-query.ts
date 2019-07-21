import gql from 'graphql-tag';

export const CreateRelation = gql`
mutation ($followingUserId: Int, $followedUserId: Int) {
  createRelation(
    followingUserId: $followingUserId,
    followedUserId: $followedUserId
   ){
     relation{
       following{
          id
          username
        }
        followed{
          id
          username
        }
      }
      ok
  }
}
`;

export const DeleteRelation = gql`
  mutation ($id: Int){
      deleteRelation(id: $id){
        ok
      }
    }
  `;
