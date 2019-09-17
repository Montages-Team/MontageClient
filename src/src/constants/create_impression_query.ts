import gql from 'graphql-tag';

export const CreateImpressionMutation = gql`
mutation createImpression($content: String!, $userName: String!, $questionId: Int!) {
  createImpression(content: $content, username: $userName, questionId: $questionId,){
      ok
      impression{
        id
        content
        postedAt
      }
  }
}`;
