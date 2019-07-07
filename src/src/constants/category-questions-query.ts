import gql from 'graphql-tag';

export const categoryQuestionsQuery: any = gql`
query getCategoryQuestions(
  $userId: Int,
  $categoryName: String,
  $page: Int,
  $size: Int){
  categoryQuestions(
    userId: $userId,
    categoryName: $categoryName,
    page: $page,
    size: $size){
    about
  }
}`;
