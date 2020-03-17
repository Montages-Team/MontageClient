import gql from 'graphql-tag';

export const answersForIndividualPageQuery: any = gql`
query answersForIndividualPage($targetUserId: Int, $targetImpressionId: Int){
    answersForIndividualPage: answersForIndividualPage(targetUserId: $targetUserId, targetImpressionId: $targetImpressionId){
      questionId
      about
      answer
      appearedAt
      updatedAt
      categoryId
      isPersonal
      userId
      impressionId
      isTarget,
     }
  }`;
