import gql from 'graphql-tag';

// export const CreateRelation = gql`
//     mutation createRelation(
//         $followingUserId: Int,
//         $followedUserId: Int,
//       ){
//         relation{
//           following{
//             id
//             username
//             asAtsign
//           }
//           followed{
//             id
//             username
//             asAtsign
//           }
//         }
//         ok
//       }
//     }
//     `;

export const CreateRelation = gql`
mutation followButton($followingUserId: Int, $followedUserId: Int) {
  createRelation(
    followingUserId: $followingUserId,
    followedUserId: $followedUserId
    ){
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
  }
}
`;
