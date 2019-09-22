<template lang="pug">
  div
    CategoryLabels(:categories="categories" :username="user.username")
    GrayCenterText
    p(v-for="question in categoryQuestions")
      QuestionCard(:question="question" @onModal="modalQuestionToggle")
    ModalForm(v-if="showQuestionModal" :placeholder="placeholder" :selectedQuestionId="selectedQuestionId" :isImpression="isImpression" @offModal="modalQuestionToggle")
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { CreateCategory } from '../../constants/create_category-query';
import { categoryQuestionsQuery } from '../../constants/category-questions-query';
import CategoryLabels from '../molecules/CategoryLabels.vue';
import QuestionCard from '../molecules/QuestionCard.vue';
import GrayCenterText from '../atoms/GrayCenterText.vue';
import ModalForm from '../organisms/ModalForm.vue';

const QuestionsPageSize: any = 10;

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
            categoryName: this.$route.params.categoryName,
            page: 0,
            size: QuestionsPageSize,
          };
        }
      },
    },
  },
})
export default class Questions extends Vue {

  @Prop()
  public user!: object;

  public categories: object[] = [
      { category: 'あなたについて', link: 'you', color: '#F0EBD8'},
      { category: 'love', link: 'love', color: '#F0EBD8'},
      { category: '趣味', link: 'hobby', color: '#F0EBD8'},
  ];
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
      if (scrollingPosition === bottomPosition.offsetHeight) {
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
