import gql from 'graphql-tag';

export const DeleteImpressionMutation = gql`
mutation deleteImpression($deleteImpressionId: Int!) {
  deleteImpression(deleteImpressionId: $deleteImpressionId){
    ok
  }
}`;
