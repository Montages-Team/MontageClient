import gql from 'graphql-tag';

export const CreateCategory = gql`
  mutation ($input: CreateCategoryMutationInput!) {
    createCategory(input: $input){
        category{
          name
          description
        }
    }
  }
`;
