<template lang="pug">
  div
    div(v-if="impressionsCount > 0")
      div(v-for="imp in userImpressions").feed-content
        sui-card.raised.qa-card
          sui-card-content
            sui-card-header(style='margin-bottom: 10px;')| Q. {{imp.question.about}}
            div(style="display: flex;")
              ProfileRoundImage.user-icon(v-if="user" :url="user.profileImgUrl", :size="impressionImgSize")
              sui-label.baloon(pointing='left', size='medium' style="background: #f5f5f5")
                p(style="color: #555555") {{imp.content}}
          ReactionIconGroup(@modalToggle="modalImpressionToggle(imp.question.about, imp.question.id)")
        ModalForm(v-if="showImpressionModal",
                  :placeholder="placeholder",
                  :selectedQuestionId="selectedQuestionId",
                  :isImpression="isImpression",
                  :showImpressionModal="showImpressionModal",
                  @offModal="modalImpressionToggle",
                  @toggle="toggleImpressionModal")
      div(v-if='loadEnable')
        sui-segment(v-if="$apollo.loading")
          sui-dimmer(active='', inverted='')
          sui-loader(content='Loading...')
      div(else)
        NoImpressionCard.no-impression(:displayName="user.displayName")
    div(v-else="impressionsCount === 0")
      NoImpressionCard.no-impression(:displayName="user.displayName")
</template>


<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import ProfileRoundImage from '../atoms/ProfileRoundImage.vue';
import NoImpressionCard from '../molecules/NoImpressionCard.vue';
import ModalForm from '../organisms/ModalForm.vue';
import ReactionIconGroup from '../molecules/ReactionIconGroup.vue';
import { impressionQuery } from '../../constants/get-user-impression-query';

const pageSize: any = 10;

@Component({
  components: {
    ProfileRoundImage,
    NoImpressionCard,
    ModalForm,
    ReactionIconGroup,
  },
  apollo: {
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
    },
  },
})
export default class Impressions extends Vue {

  @Prop({ type: Object })
  public user!: object;

  public page: number = 0;
  public impressionImgSize: string = 'mini';
  public loading: number = 0;
  public loadEnable: boolean = true;
  public showImpressionModal: boolean = false;
  public placeholder: string = '';
  public selectedQuestionId!: number;
  public isImpression: boolean = true;
  public userImpressions: object = [];

  public mounted() {
    this.watchScroll();
  }

  get impressionsCount() {
    // json内のarrayの数を数える場合はObject.keysを用いる
    return Object.keys(this.userImpressions).length;
  }

  @Emit()
  public getMoreImpressions() {
    this.page++;
    this.$apollo.queries.userImpressions.fetchMore({
      variables: {
        name: this.$route.params.userName,
        page: this.page,
        size: pageSize,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
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
  public watchScroll() {
    window.onscroll = () => {
      const scrollingPosition: number = document.documentElement.scrollTop + window.innerHeight;
      const bottomPosition: HTMLElement | null = document.getElementById('app');
      if (bottomPosition == null) { return; }
      if (scrollingPosition === bottomPosition.offsetHeight) {
        this.getMoreImpressions();
      }
    };
  }

  @Emit()
  public toggleImpressionModal() {
    this.showImpressionModal = false;
    this.$apollo.queries.userImpressions.setVariables(
      { name: this.$route.params.userName, page: 0, size: pageSize },
    );
    this.$apollo.queries.userImpressions.refetch();
  }

  @Emit()
  private modalImpressionToggle(placeholder: string, selectedQuetionId: string) {
    this.placeholder = placeholder || '';
    this.selectedQuestionId = Number(selectedQuetionId);
    this.showImpressionModal = !this.showImpressionModal;
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
</style>
