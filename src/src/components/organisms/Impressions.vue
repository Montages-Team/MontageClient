<template lang="pug">
  div
    ModalForm(v-show="placeholder" ref="modalForm"
              :placeholder="placeholder",
              :selectedQuestionId="selectedQuestionId", :postButtonContent="buttonContent",
              @offModal="modalImpressionToggle", @toggle="toggleImpressionModal")
    ModalShare(ref="modalShare" :impressionId="selectedImpressionId" :questionBody="questionBody")
    div(v-if='loadEnable')
      sui-segment(v-if="$apollo.loading")
        sui-dimmer(active inverted)
        sui-loader(content='Loading...')
    div(v-if="impressionsCount > 0")
      div(v-for="(qa, index) in userImpressions").feed-content
        QAContent(
          :url="user.profileImgUrl"
          :content="(qa.items[0].content) ? String(qa.items[0].content): ''"
          :questionAbout="qa.about"
          :impressionId="String(qa.items[0].id)")
        ReactionIconGroup(
          :impressionId="Number(qa.items[0].id)"
          :deleteIndex="index"
          routeName="impressions"
          nextId=""
          :createrUserName="qa.items[0].createrUserName"
          @toggleShareModal="openShareModal(Number(qa.items[0].id), qa.about)"
          @modalToggle="modalImpressionToggle(qa.about, qa.id, String(qa.items[0].id))")
        div.recommend-block(v-if="index !== 0 && index % recommendIndex === 0")
          h4 この人知ってる?
          div(v-for="line in recommendUserList" :key="line.id")
            router-link.border-gradient.border-gradient-purple(is='sui-label' v-for="r in line" :key="r.id" :to="{ name: 'profile', params: { userName: r.username }}")
              img(:src='r.profileImgUrl' style="border-radius: 50%;")
              span.string-left-margin(v-if="r.displayName.length > 7") {{ r.displayName.slice(0, 7) }} ...
              span.string-left-margin(v-else) {{ r.displayName }}
    div(v-else)
      NoImpressionCard.no-impression
      div.recommend-block
        h4 この人知ってる?
        div(v-for="line in recommendUserList" :key="line.id")
          router-link.border-gradient.border-gradient-purple(is='sui-label' v-for="r in line" :key="r.id" :to="{ name: 'profile', params: { userName: r.username }}")
            img(:src='r.profileImgUrl' style="border-radius: 50%;")
            span.string-left-margin(v-if="r.displayName.length > 7") {{ r.displayName.slice(0, 7) }} ...
            span.string-left-margin(v-else) {{ r.displayName }}
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { impressionQuery } from '../../constants/get-user-impression-query';
import { recommendUsersQuery } from '../../constants/recommend_users_query';
import { Modal, DimmerDimmable } from 'semantic-ui-vue';
import isMobile from 'ismobilejs';
import ConfirmButton from '../atoms/ConfirmButton.vue';
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

const pageSize: number = 15;

@Component({
  components: {
    ProfileRoundImage,
    NoImpressionCard,
    ModalForm,
    ReactionIconGroup,
    ConfirmButton,
    ModalShare,
    QAContent,
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
    recommendUsers: {
      query: recommendUsersQuery,
      variables() {
        if (this.$route && this.$route.params) {
          return {
            userName: this.$route.params.userName,
          };
        }
      },
      result({ data }: any, loading: any, networkStatus: any) {
        if (data.user === null) {
          this.$router.push({name: 'notfound'});
        }
      },
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
    modalShare: ModalShare,
  };

  @Prop({ type: Object })
  public user!: object;

  private page: number = 0;
  private loading: number = 0;
  private loadEnable: boolean = true;
  private placeholder: string = '';
  private selectedQuestionId: number = 0;
  private selectedImpressionId: string = '';
  private isImpression: boolean = true;
  private userImpressions: any = [];
  private questionBody: string = '';
  private recommendUsers: any = [];
  private recommendIndex: number = 4;

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

  private get recommendUserList() {
    /**
     * おすすめユーザをリストにして返す
     */
    const recommendList: any = [];
    recommendList.push(this.recommendUsers.slice(0, 3));
    return recommendList;
  }

  @Emit()
  private getMoreImpressions() {
    /**
     * スクロール時、現在まだ取得していない回答を取得させる関数
     */
    if (this.impressionsCount === 0) { return; }
    this.page++;
    this.$apollo.queries.userImpressions.fetchMore({
      variables: {
        name: this.$route.params.userName,
        page: this.page,
        size: pageSize,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }
        if (this.impressionsCount === 0) { return previousResult; }

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
  private openShareModal(
    selectedImpressionId: number,
    questionBody: string,
  ) {
    this.selectedImpressionId = String(selectedImpressionId);
    this.questionBody = questionBody;
    this.$refs.modalShare.toggleShareOpen();
  }

  @Emit()
  private watchScroll() {
    /**
     * スクロールを検知する関数
     *
     * profileページに行った後はwatchScrollがマウントされているので
     * 不要な部分でgetMoreImpressionsが作動してしまうことを防ぐ目的
     */
    window.onscroll = () => {
      if (this.$route.name !== 'profile') { return; }
      const scrollingPosition: number = document.documentElement.scrollTop + window.innerHeight;
      const bottomPosition: HTMLElement | null = document.getElementById('app');
      if (bottomPosition == null) { return; }
      if (scrollingPosition > bottomPosition.offsetHeight - 1000 && this.userImpressions) {
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
  private modalImpressionToggle(
    placeholder: string,
    selectedQuetionId: string,
    selectedImpressionId: string,
    ): void {
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
    this.selectedImpressionId = selectedImpressionId;
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

.montage-grid-column
  box-shadow none !important
  padding 8px !important

.recommend-block
  margin 8px 0px !important
  padding 16px !important
  background border-box !important

.recommend-username
  color #555555 !important
  padding 4px !important

.column-link
  margin 0 8px !important
  background #f0f0e0 !important

.border-gradient
  border 1px solid
  border-image-slice 1
  border-width 1px
  background #fff

.border-gradient-purple
  border-image-source linear-gradient(to left, #807DBA, #B464A3
)
</style>
