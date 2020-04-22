<template lang="pug">
  div
    ModalForm(v-show="placeholder" ref="modalForm"
              :placeholder="placeholder"
              :selectedQuestionId="selectedQuestionId"
              :postButtonContent="buttonContent"
              @offModal="modalImpressionToggle"
              @toggle="toggleImpressionModal")
    ModalShare(ref="modalShare" :impressionId="String(selectedImpressionId)" :questionBody="questionBody")
    div(v-if="answersForIndividualPage" v-for="item in answersForIndividualPage")
      //- isTargetがtrueの場合
      div.feed-content(v-if="item.isTarget")
        QAContent(:user="user" :content="item.answer" :questionAbout="item.about" :impressionId="String(item.impressionId)")
        ReactionIconGroup(
          @toggleShareModal="openShareModal(item.impressionId, item.about)" @modalToggle="modalImpressionToggle(item.about, item.questionId)")
        div.another-answer-title
          p.sub-title 他の回答
      //- isTargetがfalseの場合
      div(v-if="!item.isTarget" )
        router-link(:to="{ name: 'impression', params: { impressionId: item.impressionId }}")
          div(style="display: flex; cursor: pointer;")
            sui-label.baloon(pointing='left' size='medium', style='background: transparent')
              p(style="color: #555555")
                i.pencil.alternate.icon(style="margin-right: 8px;")
                | {{item.answer}}
      //- 指定した回答の他に回答がない場合
      div(v-if="impressionsCount == 1" style="color: #777;")
        span(style="margin: 8px;") ほかの回答はまだありません
</template>


<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { getImpressionQuery } from '../../constants/getImpression';
import { answersForIndividualPageQuery } from '../../constants/get_answers_for_individual_page_query';

import isMobile from 'ismobilejs';
import ModalForm from '../organisms/ModalForm.vue';
import ModalShare from './ModalShare.vue';
import QAContent from '../molecules/QAContent.vue';

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
    ModalShare,
    ReactionIconGroup,
    QAContent,
  },
  apollo: {
    $loadingKey: 'loading',
    answersForIndividualPage: {
      query: answersForIndividualPageQuery,
      variables() {
        // 動的ルートマッチングを利用する場合はthis.$routeのありなしでvariablesを決める
        if (this.$route && this.$route.params) {
          return {
            targetUserId: Number(this.user.id),
            targetImpressionId: Number(this.$route.params.impressionId),
          };
        }
      },
      result({ data }: any, loading: any) {
        if (data === null) {
          this.$router.push({name: 'notfound'});
        }
      },
      error(error) {
       this.$apollo.queries.user.skip = true;
       this.$router.push('/');
      },
      fetchPolicy: 'network-only',
    },
  },
})
export default class Individual extends Vue {

  public $refs!: {
    /**
     * Vue.jsの$refsを利用するための型定義
     *
     * typescriptで$refsを用いて子コンポーネントのメソッドを実行させる場合は
     * 子コンポーネントにrefで指定する値にその子コンポーネントの型を指定する必要がある。
     * 型はその子コンポーネントのexportしている名称そのものとなる。
     */
    modalForm: ModalForm,
    modalShare: ModalShare,
  };

  @Prop({ type: Object })
  public user!: object;

  private page: number = 0;
  private loading: number = 0;
  private loadEnable: boolean = true;
  private placeholder: string = '';
  private selectedQuestionId: number = 0;
  private selectedImpressionId: number = 0;
  private questionBody: string = '';
  private isImpression: boolean = true;
  private answersForIndividualPage: object = [];

  private get impressionsCount() {
    // json内のarrayの数を数える場合はObject.keysを用いる
    return Object.keys(this.answersForIndividualPage).length;
  }

  private get isMobile() {
    /**
     * isMobile.jsによってユーザのエージェントを判定できる。
     */
    return isMobile(navigator.userAgent).phone;
  }

  private get buttonContent() {
    /**
     * 回答系のボタンを押した際にボタンに表示させるラベルを決定させる関数
     */
    const buttonContent = this.isImpression ? 'Collage' : '投稿する';
    return buttonContent;
  }

  @Emit()
  public openShareModal(
    selectedImpressionId: number,
    questionBody: string,
  ) {
    this.selectedImpressionId = selectedImpressionId;
    this.questionBody = questionBody;
    this.$refs.modalShare.toggleShareOpen();
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

p.sub-title
  font-weight bold
  font-size 120%
  color #888

.another-answer-title
  margin-left 10px !important
  margin-top 20px !important

.card-header
  margin-bottom 10px
</style>
