import gql from 'graphql-tag';

export const categoryQuestionsQuery: any = gql`
query categoryQuestions(
  $userId: Int,
  $categoryId: Int,
  $page: Int,
  $size: Int){
  categoryQuestions(
    userId: $userId,
    categoryId: $categoryId,
    page: $page,
    size: $size){
    id
    about
  }
}`;
