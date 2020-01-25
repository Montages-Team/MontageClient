import gql from 'graphql-tag';

export const AllCategoriesQuery: any = gql`
query allCategories {
  categories{
    id
    name
    description
  }
}`;
