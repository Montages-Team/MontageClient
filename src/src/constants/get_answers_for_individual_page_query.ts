import gql from 'graphql-tag';

export const answersForIndividualPageQuery: any = gql`
query answersForIndividualPage($targetUserName: String, $targetImpressionId: Int){
    answersForIndividualPage: answersForIndividualPage(targetUserName: $targetUserName, targetImpressionId: $targetImpressionId){
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
