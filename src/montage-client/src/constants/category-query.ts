import gql from 'graphql-tag';

// export const CreateCategory = gql`
//     mutation {
//       createCategory(input: { name: "プログラミン2", description: "ピクミン2"})
//       {
//         category{
//           name
//           description
//         }
//       }
//     }

export const CreateCategory = gql`
mutation ($input: dict) {
  createCategory(input: $input){
      category{
        name
        description
      }
    }
  }
  `;
