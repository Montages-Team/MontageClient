import gql from 'graphql-tag';

export const answersForIndividualPageLocalQuery: any = gql`
query answersForIndividualPage($targetUserName: String, $targetImpressionId: Int){
    answersForIndividualPage: answersForIndividualPage(
      targetUserName: $targetUserName,
      targetImpressionId: $targetImpressionId) @client {
      questionId
      about
      answer
      appearedAt
      updatedAt
      categoryId
      isPersonal
      userId
      impressionId
      createrUserName
      isTarget
     }
  }`;
