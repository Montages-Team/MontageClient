<template lang='pug'>
  div
    div.overlay-area
      sui-image.picture-area(:src="user.profileImgUrl" fluid alt='プロフィール画像')
      div.name-area
        div.displayname {{user.displayName}}
        div.username.font-size__small @{{user.username}}
      //- FollowButton
      ProfileCardStats.follow-area.font-size__small(:stats="{following:  22, follower: 33}")
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import FollowButton from '../atoms/followButton.vue';
import ProfileCardStats from './ProfileCardStats.vue';


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

.name-area
  position absolute
  color #fff
  left 16px
  bottom 0px
  margin 0
  font-weight 900
  text-shadow 1px 2px 3px #080808
  padding 16px 8px 8px
  height 20%
  width 50%

.follow-area
  position absolute
  text-shadow 1px 2px 3px #080808
  bottom 8px
  right 16px

.username
  line-height normal

.displayname
  font-size 24px
  line-height normal
</style>