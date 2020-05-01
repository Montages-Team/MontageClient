<template lang="pug">
  div
    transition(v-if="notification" name='fade')
      sui-label.success-label(inverted color='pink') プロフィールに反映されました
    CategoryLabels(:username="user.username" :categoryId="targetCategoryId")
    GrayCenterText(content="カテゴリごとに質問を選ぼう!")
    p(v-for="(question, index) in categoryQuestions")
      QuestionCard(:question="question" @onModal="modalQuestionToggle")
      CategoryLabels(
        v-show="index !== 0 && index % 10 === 0"
        :username="user.username"
        :categoryId="targetCategoryId"
      )
      GrayCenterText(v-show="index !== 0 && index % 10 === 0" content="他のカテゴリー")
    ModalForm(
      v-show="placeholder"
      ref="modalForm"
      :placeholder="placeholder"
      :selectedQuestionId="selectedQuestionId"
      postButtonContent="回答する"
      @offModal="modalQuestionToggle"
      @emitSetNotify="setNotify")
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

const QuestionsPageSize: number = 15;

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
  public notification: boolean = false;
  public placeholder: string = '';
  public selectedQuestionId: number = 0;
  public categoryQuestions: any = [];

  public mounted() {
    this.watchScroll();
  }

  private get targetCategoryId() {
    return String(this.$parent.$route.params.categoryId);
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
  public offNotification(): void {
    this.notification = false;
  }

  @Emit()
  public setNotify(): void {
    /**
     * 質問回答ボタンを押下した際に呼ばれる関数
     */
    this.notification = true;
    setTimeout(this.offNotification, 3000);
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
      if (scrollingPosition > bottomPosition.offsetHeight - 500) {
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

.success-label
  right 4vw !important
  bottom 3vh !important
  position fixed !important
  z-index 1000 !important

.fade-leave-active
  transition opacity .5s !important

.fade-enter-active
  transition opacity .5s !important

.fade-leave-to
  opacity 0 !important

.fade-enter
  opacity 0 !importan
</style>
