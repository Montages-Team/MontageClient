<template lang="pug">
  div
    div(v-if="impressionsCount > 0")
      div(v-for="imp in userImpressions").feed-content
        sui-card.raised.qa-card
          sui-card-content
            sui-card-header.card-header
              | Q. {{imp.question.about}}
            div(v-if="user" style="display: flex;")
              ProfileRoundImage.user-icon(:url="user.profileImgUrl" :size="impressionImgSize")
              sui-label.baloon(pointing='left' size='medium' style="background: #f5f5f5")
                p(style="color: #555555") {{imp.content}}
          ReactionIconGroup(@modalToggle="modalImpressionToggle(imp.question.about, imp.question.id)")
      div(v-if='loadEnable')
        sui-segment(v-if="$apollo.loading")
          sui-dimmer(active inverted)
          sui-loader(content='Loading...')
      div(else)
        NoImpressionCard.no-impression(:displayName="user.displayName")
    div(v-else)
      NoImpressionCard.no-impression(:displayName="user.displayName")
    ModalForm(v-show="placeholder"
              ref="modalForm"
              :placeholder="placeholder",
              :selectedQuestionId="selectedQuestionId",
              :postButtonContent="buttonContent",
              @offModal="modalImpressionToggle",
              @toggle="toggleImpressionModal")
</template>


<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { impressionQuery } from '../../constants/get-user-impression-query';
import { Modal, DimmerDimmable } from 'semantic-ui-vue';
import isMobile from 'ismobilejs';
import ConfirmButton from '../atoms/ConfirmButton.vue';
import ModalForm from '../organisms/ModalForm.vue';

const ProfileRoundImage = () => import(
  /* webpackChunkName: "profile-round-image" */
  '../atoms/ProfileRoundImage.vue');

const NoImpressionCard = () => import(
  /* webpackChunkName: "no-impression-card" */
  '../molecules/NoImpressionCard.vue');

const ReactionIconGroup = () => import(
  /* webpackChunkName: "reaction-icon-group" */
  '../molecules/ReactionIconGroup.vue');

const pageSize: any = 10;

@Component({
  components: {
    ProfileRoundImage,
    NoImpressionCard,
    ModalForm,
    ReactionIconGroup,
    ConfirmButton,
  },
  apollo: {
    /**
     * すべての回答をpageSideに従って取得する
     */
    $loadingKey: 'loading',
    userImpressions: {
      query: impressionQuery,
      variables() {
        // 動的ルートマッチングを利用する場合はthis.$routeのありなしでvariablesを決める
        if (this.$route && this.$route.params) {
          return {
            name: this.$route.params.userName,
            page: 0,
            size: pageSize,
          };
        }
      },
      // 投稿後にすぐに反映させるためにキャッシュとネットワーク併用
      fetchPolicy: 'cache-and-network',
    },
  },
})
export default class Impressions extends Vue {

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

  @Prop({ type: Object })
  public user!: object;

  public page: number = 0;
  public impressionImgSize: string = 'mini';
  public loading: number = 0;
  public loadEnable: boolean = true;
  public placeholder: string = '';
  public selectedQuestionId: number = 0;
  public isImpression: boolean = true;
  public userImpressions: object = [];

  private mounted() {
    this.watchScroll();
  }

  private get isMobile() {
    /**
     * isMobile.jsによってユーザのエージェントを判定できる。
     */
    return isMobile(navigator.userAgent).phone;
  }

  private get impressionsCount() {
    /**
     * 回答数を計算する関数
     *
     * json内のarrayの数を数える場合はObject.keysを用いる
     */
    return Object.keys(this.userImpressions).length;
  }

  private get buttonContent() {
    /**
     * 回答系のボタンを押した際にボタンに表示させるラベルを決定させる関数
     */
    const buttonContent = this.isImpression ? 'Collage' : '投稿する';
    return buttonContent;
  }

  @Emit()
  private getMoreImpressions() {
    /**
     * スクロール時、現在まだ取得していない回答を取得させる関数
     */
    this.page++;
    this.$apollo.queries.userImpressions.fetchMore({
      variables: {
        name: this.$route.params.userName,
        page: this.page,
        size: pageSize,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }
        const pre = previousResult.userImpressions;
        const result = fetchMoreResult.userImpressions;
        if (result.length < pageSize) {
          this.loadEnable = false;
        }
        // 新しく取得したものと過去に取得していたものをマージ
        const userImpressions = [...pre, ...result];
        return { userImpressions };
      },
    });
  }

  @Emit()
  private watchScroll() {
    window.onscroll = () => {
      /**
       * スクロールを検知する関数
       *
       * profileページに行った後はwatchScrollがマウントされているので
       * 不要な部分でgetMoreImpressionsが作動してしまうことを防ぐ目的
       */
      if (this.$route.name !== 'profile') { return; }
      const scrollingPosition: number = document.documentElement.scrollTop + window.innerHeight;
      const bottomPosition: HTMLElement | null = document.getElementById('app');
      if (bottomPosition == null) { return; }
      if (scrollingPosition === bottomPosition.offsetHeight) {
        this.getMoreImpressions();
      }
    };
  }

  @Emit()
  private toggleImpressionModal() {
    /**
     * 回答投稿後に呼ばれる関数.
     *
     * 1. userImpressionに設定
     * 2. userImpressionを再取得する
     * 3. モーダルを閉じる
     */
    this.$apollo.queries.userImpressions.setVariables(
      { name: this.$route.params.userName, page: 0, size: pageSize },
    );
    this.$apollo.queries.userImpressions.refetch();
    this.$refs.modalForm.toggleOpen();
  }

  @Emit()
  private modalImpressionToggle(placeholder: string, selectedQuetionId: string): void {
    /**
     * collageボタンを押下した際に呼ばれる関数
     *
     * 1. 子コンポーネントのopenという変数を切り替えるメソッド(toggleOpen)を呼び、モーダルを開く
     * 2. フォームのplaceholderを設定
     * 3. 選択されたImpressionのIDをモーダルに設定
     */
    this.$refs.modalForm.toggleOpen();
    this.placeholder = placeholder || '';
    this.selectedQuestionId = Number(selectedQuetionId);
  }
}
</script>

<style lang="stylus" scoped>
.modal-btn
  color #fff !important
  font-weight inherit !importan
  background #B464A3

.modal-header
  display flex
  background #FFFFFF !important
  padding 16px 8px !important
  float right

.card-header
  margin-bottom 10px !important

.modal-fontsize
 font-size 22px

.modal-body
  height 100%

.justify
  display block !important
  margin 16px auto !important

.feed-content
  margin 8px 0

.qa-card
  box-shadow none !important
  width auto !important

.user-icon
 margin 5px !important

.baloon
  width 80%
  word-break break-word
  margin 6px !important
  padding 8px !important
  color #555555 !important

.no-NoImpressionCard
  background red !important
</style>
