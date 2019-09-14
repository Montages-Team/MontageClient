<template lang="pug">
  div
    div(v-if="userImpressions.length")
      div(v-for="imp in userImpressions").feed-content
        sui-card.raised.qa-card
          sui-card-content
            sui-card-header(style='margin-bottom: 10px;')
            | Q. {{imp.question.about}}
            div(style="display: flex;")
              ProfileRoundImage.user-icon(v-if="user" :url="user.profileImgUrl", :size="impressionImgSize")
              sui-label.baloon(pointing='left', size='medium' style="background: #f5f5f5")
                p(style="color: #555555") {{imp.content}}
          sui-button-group(icons size="small" style="padding: 0px 4px 0px 28px")
            sui-button.icon-button-group(icon='like' content="4")
            sui-button.icon-button-group(icon='twitter')
            sui-button.icon-button-group(icon='sync')
            sui-button.icon-button-group(icon='paint brush')
      div(v-if='loadEnable')
        sui-segment(v-if="$apollo.loading")
          sui-dimmer(active='', inverted='')
          sui-loader(content='Loading...')
      div(else)
        NoImpressionCard.no-impression(:displayName="user.displayName")
    div(v-else="userImpressions.length")
      NoImpressionCard.no-impression(:displayName="user.displayName")
</template>


<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';
import ProfileRoundImage from '../atoms/ProfileRoundImage.vue';
import NoImpressionCard from '../molecules/NoImpressionCard.vue';

const pageSize: any = 10;
const impressionQuery: any = gql`
query getUserImpressions($name: String, $page: Int, $size: Int){
  userImpressions(username: $name, page: $page, size: $size){
    content
    question{
      about
    }
  }
}`;

@Component({
  components: {
    ProfileRoundImage,
    NoImpressionCard,
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
  public mounted() {
    this.watchScroll();
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

.icon-button-group
  background #FFF !important

.no-NoImpressionCard
  background red !important
</style>
