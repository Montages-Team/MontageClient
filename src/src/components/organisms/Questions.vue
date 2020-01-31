<template lang="pug">
  div
    CategoryLabels(:username="user.username")
    GrayCenterText
    p(v-for="question in categoryQuestions")
      QuestionCard(:question="question" @onModal="modalQuestionToggle")
    ModalForm(
      v-if="showQuestionModal"
      :placeholder="placeholder"
      :selectedQuestionId="selectedQuestionId"
      :isImpression="isImpression"
      @offModal="modalQuestionToggle")
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { CreateCategory } from '../../constants/create_category-query';
import { categoryQuestionsQuery } from '../../constants/category-questions-query';

const CategoryLabels = () => import(
  /* webpackChunkName: "profile-round-image" */
  '../molecules/CategoryLabels.vue');

const QuestionCard = () => import(
  /* webpackChunkName: "question-card" */
  '../molecules/QuestionCard.vue');

const GrayCenterText = () => import(
  /* webpackChunkName: "gray-center-text" */
  '../atoms/GrayCenterText.vue');

const ModalForm = () => import(
  /* webpackChunkName: "modal-form" */
  '../organisms/ModalForm.vue');

const QuestionsPageSize: number = 10;

@Component({
  components: {
    CategoryLabels,
    QuestionCard,
    GrayCenterText,
    ModalForm,
  },
  apollo: {
    categoryQuestions: {
      query: categoryQuestionsQuery,
      variables() {
        if (this.$route && this.$route.params) {
          return {
            userId: this.user.id,
            categoryId: this.$route.params.categoryId,
            page: 0,
            size: QuestionsPageSize,
          };
        }
      },
      result({ data }: any, loading: any, networkStatus: any) {
        if (data.categoryQuestions === null) {
          console.info('There is no questions of the category.');
        }
      },
      error(error) {
        console.error(error);
      },
    },
  },
})
export default class Questions extends Vue {

  @Prop()
  public user!: object;
  public page: number = 0;
  public loading: number = 0;
  public loadEnable: boolean = true;
  public showQuestionModal: boolean = false;
  public placeholder: string = '';
  public selectedQuestionId!: number;
  public isImpression: boolean = false;
  public mounted() {
    this.watchScroll();
  }

  @Emit()
  public modalQuestionToggle(placeholder: string, selectedQuetionId: string) {
    this.placeholder = placeholder || '';
    this.selectedQuestionId = Number(selectedQuetionId);
    this.showQuestionModal = !this.showQuestionModal;
  }

  @Emit()
  public getMoreQuestions() {
    this.page++;
    this.$apollo.queries.categoryQuestions.fetchMore({
      variables: {
        name: this.$route.params.userName,
        page: this.page,
        size: QuestionsPageSize,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const pre = previousResult.categoryQuestions;
        const result = fetchMoreResult.categoryQuestions;
        if (result.length < QuestionsPageSize) {
          this.loadEnable = false;
        }
        // 新しく取得したものと過去に取得していたものをマージ
        const categoryQuestions = [...pre, ...result];
        return { categoryQuestions };
      },
    });
  }

  @Emit()
  public watchScroll() {
    window.onscroll = () => {
      const scrollingPosition: number = document.documentElement.scrollTop + window.innerHeight;
      const bottomPosition: HTMLElement | null = document.getElementById('app');
      if (bottomPosition == null) { return; }
      if (scrollingPosition > bottomPosition.offsetHeight) {
        this.getMoreQuestions();
      }
    };
  }
}
</script>

<style lang="stylus" scoped>
ul > li
    margin-right 10px
    display inline-block
    width 220px
    border 1px solid #ddd
    background #fff

.modal-fixed
  position fixed
  width 100%
</style>
