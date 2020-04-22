<template lang='pug'>
  div
    div.overlay-area(v-if="isMobile" :style="{ backgroundImage: 'url(' + 'https://cdn.pixabay.com/photo/2015/03/26/09/59/purple-690724_960_720.jpg' + ')' }")
      sui-dropdown.icon.montage-dropdown(icon='ellipsis horizontal' button pointing)
        sui-dropdown-menu
          sui-dropdown-item
            router-link(:to="{ name: 'settings'}")
              sui-icon(name='wrench')
              | 設定
          sui-dropdown-item
            a(:href='twitterLink')
              sui-icon(name='twitter')
              | Twitter
          //- sui-dropdown-item
          //-   sui-icon(name='images')
          //-   | 写真の変更
      sui-statistic(style="width: 100vw; padding: 40px;")
        sui-statistic-value
          img.ui.circular.inline.image(:src='user.profileImgUrl' size="small")
        sui-statistic-label(style="font-size: 18px; color: #fff")
          div(style="font-size: 16px; color: #d9d9d9") {{user.displayName}}
          div(style="font-size: 12px; color: #d9d9d9") @{{user.username}}
    div.overlay-area(v-else)
      sui-card
        sui-card-content.card-content-style-pc
          sui-image.card-img-style-pc(circular :src="user.profileImgUrl")
          sui-card-header {{user.displayName}}
          sui-card-meta @{{user.username}}
        sui-card-content.card-content-style-pc(extra)
          a(:href='twitterLink')
            sui-icon(name='twitter')
            span twitter
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import isMobile from 'ismobilejs';

const FollowButton = () => import(
  /* webpackChunkName: "follow-button" */
  '../atoms/followButton.vue');
const ProfileCardStats = () => import(
  /* webpackChunkName: "profile-card-stats" */
  './ProfileCardStats.vue');

@Component({
  components: {
    FollowButton,
    ProfileCardStats,
  },
})
export default class ProfileImageTop extends Vue {
  @Prop({ type: Object })
  private user!: object;

  private get isMobile() {
    return isMobile(navigator.userAgent).phone;
  }

  private get twitterLink() {
    return 'https://twitter.com/' + this.$route.params.userName;
  }
}
</script>

<style lang="stylus" scoped>
.overlay-area
  position relative
  background -webkit-gradient(linear,left top,left bottom, color-stop(-30%,transparent),to(#181818))
  background linear-gradient(#00000000 90%, #f0f0f0)

.card-content-style-pc
  text-align center !important
  padding 16px !important

.card-img-style-pc
  padding 8px !important
  margin-bottom 16px !important

.picture-area
  width -webkit-fill-available !important
  background-size cover !important
  background-position 50% !important
  z-index -1 !important

.float-area
  position absolute
  display flex
  color #fff
  bottom 0px
  margin 0
  font-weight 900
  text-shadow 1px 2px 3px #080808
  padding 0% 8%
  width 100%
  height 18%

.follow-area
  width 50%
  margin-left 10%

.username
  line-height normal

.displayname
  font-size 24px
  line-height normal

.buttonstyle__normal
  background #B464A3 !important
  margin 0px 14% !important
  width 72% !important
  color #fff !important

.montage-dropdown
  color #fff !important
  margin 4px 0px 0px 8px !important
  background none !important
  font-size 24px !important
</style>