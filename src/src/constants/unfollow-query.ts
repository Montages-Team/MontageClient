import gql from 'graphql-tag';

export const DeleteRelation = gql`
  mutation ($id: Int){
      deleteRelation(id: $id){
        ok
      }
    }
    `;
