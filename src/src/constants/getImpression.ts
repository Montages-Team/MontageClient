import gql from 'graphql-tag';

export const getImpressionQuery: any = gql`
query getImpressionQuery($impId: Int){
    impression: impression(impId: $impId){
        id
        content
        question{
          user {
            edges {
              node {
                profileImgUrl
              }
            }
          }
          id
          about
          appearedAt
          category{
            id
            name
          }
        }
    }
  }`;
