<template lang="pug">
  div
    CategoryLabels(:categories="categories", :user="user")
    GrayCenterText
    p(v-for="question in categoryQuestions")
      QuestionCard(:question="question")
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { CreateCategory } from '../../constants/create_category-query';
import { categoryQuestionsQuery } from '../../constants/category-questions-query';
import CategoryLabels from '../molecules/CategoryLabels.vue';
import QuestionCard from '../molecules/QuestionCard.vue';
import GrayCenterText from '../atoms/GrayCenterText.vue';

const QuestionsPageSize: any = 2;

@Component({
  components: {
    CategoryLabels,
    QuestionCard,
    GrayCenterText,
  },
  apollo: {
    categoryQuestions: {
      query: categoryQuestionsQuery,
      variables() {
        if (this.$route && this.$route.params) {
          return {
            userId: 32,
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
  public categories: object[] = [
      { category: 'あなたについて', link: 'you', color: 'brown'},
      { category: 'love', link: 'love', color: 'brown'},
      { category: '趣味', link: 'hobby', color: 'brown'},
  ];
  public page: number = 0;
  public loading: number = 0;
  public loadEnable: boolean = true;
  public mounted() {
    this.watchScroll();
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




.flex-category-box
    padding-bottom: 8px;
    display: flex;
    white-space: nowrap;
    margin: 0 24px;

.flex-category-box-inline
    display inline-block
    list-style none
    padding 0
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    margin: 25px 0 0;
    -webkit-overflow-scrolling: touch;

ul > li
    margin-right 10px
    display inline-block
    width 220px
    border 1px solid #ddd
    background #fff
</style>
