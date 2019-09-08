import gql from 'graphql-tag';

export const CreateImpressionMutation = gql`
mutation ($content: String!, $userName: String!, $questionId: Int!) {
  result: createImpression(content: $content, username: $userName, questionId: $questionId,){
      ok
      impression{
        id
        content
        postedAt
      }
  }
}`;
