import gql from 'graphql-tag';

export const CreateRelation = gql`
  mutation{
      deleteRelation(id: Int!){
        ok
      }
    }
    `;
