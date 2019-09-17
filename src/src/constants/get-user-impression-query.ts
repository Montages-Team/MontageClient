import gql from 'graphql-tag';

export const impressionQuery: any = gql`
query getUserImpressions($name: String, $page: Int, $size: Int){
  userImpressions(username: $name, page: $page, size: $size){
    id
    content
    question{
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
