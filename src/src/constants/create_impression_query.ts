import gql from 'graphql-tag';

export const CreateImpressionMutation = gql`
mutation createImpression(
  $content: String!,
  $userName: String!,
  $questionId: Int!,
  $authUsername: String!,
  ) {
  createImpression(content: $content, username: $userName, questionId: $questionId, authUsername: $authUsername){
      ok
      impression{
        id
        content
        postedAt
        createdBy{
          id
          username
          displayName
        }
      }
  }
}`;
