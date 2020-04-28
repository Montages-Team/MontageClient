import gql from 'graphql-tag';

export const impressionLocalQuery: any = gql`
query getUserImpressions($name: String, $page: Int, $size: Int){
  userImpressions(username: $name, page: $page, size: $size) @client {
    id
    about
    items {
      id
      content
      postedAt
      createrUserName
    }
  }
}`;
