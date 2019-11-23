<template lang='pug'>
  div
    div.overlay-area
      sui-image.picture-area(:src="user.profileImgUrl" fluid alt='プロフィール画像')
      div.float-area
        div(style="width: 50%;")
          div.displayname {{user.displayName}}
          div.username.font-size__small @{{user.username}}
        //- ProfileCardStats.font-size__small.follow-area(:stats="{following:  22, follower: 33}")
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

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
}
</script>

<style lang="stylus" scoped>
.overlay-area
  position relative
  background -webkit-gradient(linear,left top,left bottom, color-stop(-30%,transparent),to(#181818))
  background linear-gradient(#00000000 90%, #f0f0f0)

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
</style>