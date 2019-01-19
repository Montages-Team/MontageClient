import gql from 'graphql-tag';

// createCategory(input: { name: "お買い物", description: "ショッピング情報について全般" })
export const CreateCategory = gql`
      CreateCategory(input: { name: str, description: str})
      {
        category{
          name
          description
        }
      }
  `;
