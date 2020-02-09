<template lang="pug">
  div
    CategoryLabels(:username="user.username")
    GrayCenterText
    p(v-for="question in categoryQuestions")
      QuestionCard(:question="question" @onModal="modalQuestionToggle")
    ModalForm(
      v-show="placeholder"
      ref="modalForm"
      :placeholder="placeholder"
      :selectedQuestionId="selectedQuestionId"
      postButtonContent="回答する"
      @offModal="modalQuestionToggle")
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { CreateCategory } from '../../constants/create_category-query';
import { categoryQuestionsQuery } from '../../constants/category-questions-query';
import ModalForm from '../organisms/ModalForm.vue';

const CategoryLabels = () => import(
  /* webpackChunkName: "profile-round-image" */
  '../molecules/CategoryLabels.vue');

const QuestionCard = () => import(
  /* webpackChunkName: "question-card" */
  '../molecules/QuestionCard.vue');

const GrayCenterText = () => import(
  /* webpackChunkName: "gray-center-text" */
  '../atoms/GrayCenterText.vue');

const QuestionsPageSize: number = 10;

@Component({
  components: {
    CategoryLabels,
    QuestionCard,
    GrayCenterText,
    ModalForm,
  },
  apollo: {
    /**
     * カテゴリ毎の質問を取得する
     */
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
        if (!data.categoryQuestions) {
          console.info('There is no questions of the category.');
        }
      },
      error(error) {
        console.error(error);
      },
      fetchPolicy: 'no-cache',
    },
  },
})
export default class Questions extends Vue {

  public $refs!: {
    /**
     * Vue.jsの$refsを利用するための型定義
     *
     * typescriptで$refsを用いて子コンポーネントのメソッドを実行させる場合は
     * 子コンポーネントにrefで指定する値にその子コンポーネントの型を指定する必要がある。
     * 型はその子コンポーネントのexportしている名称そのものとなる。
     */
    modalForm: ModalForm,
  };

  @Prop()
  public user!: object;

  public page: number = 0;
  public loading: number = 0;
  public loadEnable: boolean = true;
  public placeholder: string = '';
  public selectedQuestionId: number = 0;

  public mounted() {
    this.watchScroll();
  }

  @Emit()
  public modalQuestionToggle(placeholder: string, selectedQuetionId: string): void {
    /**
     * 質問回答ボタンを押下した際に呼ばれる関数
     *
     * 1. 子コンポーネントのopenという変数を切り替えるメソッド(toggleOpen)を呼び、モーダルを開く
     * 2. フォームのplaceholderを設定
     * 3. 選択されたQuestionのIDをモーダルに設定
     */
    this.$refs.modalForm.toggleOpen();
    this.placeholder = placeholder || '';
    this.selectedQuestionId = Number(selectedQuetionId);
  }

  @Emit()
  public getMoreQuestions() {
    /**
     * スクロール時、現在まだ取得していない質問を取得させる関数
     */
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
    /**
     * スクロールを検知する関数
     *
     * profileページに行った後はwatchScrollがマウントされているので
     * 不要な部分でgetMoreImpressionsが作動してしまうことを防ぐ目的
     */
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
